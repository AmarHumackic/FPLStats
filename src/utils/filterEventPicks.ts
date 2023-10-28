import {
  FixtureDelegate,
  GWLiveDelegate,
  PickDelegate,
  PlayerDelegate,
  PlayerIdBonus,
  TeamDelegate,
  TeamPlayerDelegate,
} from 'src/types/api';
import {getElementsBonus} from './getElementsBonus';
import {MIN_ELEMENT_TYPES_LINEUP} from '@constants/index';

export const filterEventPicks = (
  elements?: PlayerDelegate[],
  teams?: TeamDelegate[],
  picks?: PickDelegate[],
  elementsLive?: GWLiveDelegate['elements'],
  fixtures?: FixtureDelegate[],
  event?: number,
) => {
  if (
    !elements?.length ||
    !teams?.length ||
    !picks?.length ||
    !elementsLive?.length ||
    !fixtures?.length ||
    !event
  ) {
    return {
      goalKeepersM: [],
      defendersM: [],
      midfieldersM: [],
      forwardersM: [],
      bench: [],
      eventPoints: 0,
      isCaptainActive: true,
    };
  }

  const eventFixtures = fixtures.filter(f => f.event === event);

  const elementsBonus = getElementsBonus(eventFixtures, elementsLive);

  const captainId = picks.find(p => p.is_captain)?.element;
  const captainLive = elementsLive.find(el => el.id === captainId);
  const captainFixture = eventFixtures.find(
    ef => ef.id === captainLive?.explain[0].fixture,
  );
  const isCaptainActive =
    captainFixture?.finished_provisional && !captainLive?.stats.minutes
      ? false
      : true;

  const eventPicks: TeamPlayerDelegate[] = picks.map(p => {
    const _element = elements.find(el => el.id === p.element) as PlayerDelegate;
    const _elementLive = elementsLive?.find(
      el => el.id === p.element,
    ) as GWLiveDelegate['elements'][0];
    const elementFixture = eventFixtures.find(
      ef => ef.id === _elementLive.explain[0].fixture,
    );
    const rivalTeamId =
      elementFixture?.team_a === _element.team
        ? elementFixture.team_h
        : elementFixture?.team_h === _element.team
        ? elementFixture.team_a
        : 0;

    return {
      id: _element.id,
      element_type: _element.element_type,
      team: _element.team,
      code: _element.code,
      web_name: _element.web_name,
      news: _element.news,
      is_captain: p.is_captain,
      is_vice_captain: p.is_vice_captain,
      multiplier: p.multiplier,
      in_dreamteam: _elementLive.stats.in_dreamteam,
      minutes: _elementLive.stats.minutes,
      yellow_cards: _elementLive.stats.yellow_cards,
      red_cards: _elementLive.stats.red_cards,
      assists: _elementLive.stats.assists,
      goals_scored: _elementLive.stats.goals_scored,
      creativity: _elementLive.stats.creativity,
      influence: _elementLive.stats.influence,
      threat: _elementLive.stats.threat,
      in_lineup: true, // set all to true temporarily
      total_points_live: getEventPlayerPoints(
        p,
        _elementLive,
        isCaptainActive,
        elementsBonus,
      ),
      fixture_started: elementFixture?.started || false,
      fixture_finished:
        elementFixture?.finished ||
        elementFixture?.finished_provisional ||
        false,
      rival_team_short_name:
        teams.find(t => t.id === rivalTeamId)?.short_name || '',
      fixture_home: rivalTeamId === elementFixture?.team_a ? true : false,
    };
  });

  const eventPicksLinedUp = getPlayersLinedUp(eventPicks); // this will include bench points in case some of the first 11 do not play

  const goalKeepersM = eventPicksLinedUp.filter(
    p => p.element_type === 1 && p.multiplier,
  );
  const defendersM = eventPicksLinedUp.filter(
    p => p.element_type === 2 && p.multiplier,
  );
  const midfieldersM = eventPicksLinedUp.filter(
    p => p.element_type === 3 && p.multiplier,
  );
  const forwardersM = eventPicksLinedUp.filter(
    p => p.element_type === 4 && p.multiplier,
  );
  const bench = eventPicksLinedUp.filter(p => !p.multiplier);
  const eventPoints = [
    ...goalKeepersM,
    ...defendersM,
    ...midfieldersM,
    ...forwardersM,
    ...bench,
  ].reduce(
    (sum, item) => sum + (item.in_lineup ? item.total_points_live : 0),
    0,
  );

  return {
    goalKeepersM,
    defendersM,
    midfieldersM,
    forwardersM,
    bench,
    eventPoints,
    isCaptainActive,
  };
};

const getEventPlayerPoints = (
  elementPick: PickDelegate,
  elementLive: GWLiveDelegate['elements'][0],
  isCaptainActive: boolean,
  elementsBonus: PlayerIdBonus[],
) => {
  let totalPoints = elementLive.stats.total_points;
  const bonus = elementsBonus.find(eb => eb.id === elementLive.id)?.bonus || 0;

  if (!elementLive.stats.bonus && elementLive.stats.bps) {
    totalPoints += bonus;
  }

  if (
    (elementPick.is_captain && isCaptainActive) ||
    (elementPick.is_vice_captain && !isCaptainActive)
  ) {
    return totalPoints * 2;
  } else {
    return totalPoints;
  }
};

export const getPlayersLinedUp = (players: TeamPlayerDelegate[]) => {
  const multipliersP = players.filter(p => p.multiplier);
  const initialBench: TeamPlayerDelegate[] = players.filter(p => !p.multiplier); // players that were initially on the bench
  const benchLineups: TeamPlayerDelegate[] = []; // players that are included in the lineup because some of the first 11 do not play

  // TODO: Include logic for suspended/inactive players, do not include them
  return players.map(p => {
    let inLineup = true;
    if (!p.multiplier) {
      // is not in first 11 - check if benchLineups contains the player, if yes, set lineup to true
      inLineup = benchLineups.some(bl => bl.id === p.id);
    } else {
      if (p.fixture_started && !p.minutes) {
        // match started, player is not playing - count points from bench replacement
        for (let index = 0; index < initialBench.length; index++) {
          const initialBenchP = initialBench[index];
          if (initialBenchP.element_type === p.element_type) {
            // same element type - just add initialBench player benchLineup, and remove it from the initialBench
            inLineup = false;
            benchLineups.push(initialBenchP);
            initialBench.splice(index, 1);
            break;
          } else {
            // not same element type - calculate minimum players of element type
            if (
              initialBenchP.element_type !== 1 &&
              multipliersP.filter(mp => mp.element_type === p.element_type)
                .length > MIN_ELEMENT_TYPES_LINEUP?.[p.element_type]
            ) {
              // there is more than min number of players per element type - bench replacement is possible
              inLineup = false;
              benchLineups.push(initialBenchP);
              initialBench.splice(index, 1);
              // remove current player from multipliersP
              multipliersP.splice(
                multipliersP.indexOf(
                  multipliersP.find(mp => mp.id === p.id) as TeamPlayerDelegate,
                ),
                1,
              );
              break;
            }
          }
        }
      } else {
        inLineup = true;
      }
    }

    return {
      ...p,
      in_lineup: inLineup,
    };
  });
};
