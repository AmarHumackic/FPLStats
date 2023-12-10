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
import dayjs from 'dayjs';

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
    (captainFixture?.started ||
      dayjs().isAfter(dayjs(captainFixture?.kickoff_time))) &&
    !captainLive?.stats.minutes
      ? false
      : true;

  const eventPicks: TeamPlayerDelegate[] = picks.map(p => {
    const _element = elements.find(el => el.id === p.element) as PlayerDelegate;
    const _elementLive = elementsLive?.find(
      el => el.id === p.element,
    ) as GWLiveDelegate['elements'][0];
    const elementFixture = eventFixtures.find(
      ef => ef.id === _elementLive.explain?.[0]?.fixture,
    );
    const shouldCheckLineups = dayjs().isAfter(
      dayjs(elementFixture?.kickoff_time).add(5, 'minutes'),
    );
    const rivalTeamId =
      elementFixture?.team_a === _element.team
        ? elementFixture.team_h
        : elementFixture?.team_h === _element.team
        ? elementFixture.team_a
        : 0;

    return {
      tsType: 'TeamPlayer',
      id: _element.id,
      element_type: _element.element_type,
      team: _element.team,
      code: _element.code,
      web_name: _element.web_name,
      news: _element.news,
      status: _element.status || 'a',
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
      bps: _elementLive.stats.bps,
      in_lineup: true, // set all to true temporarily
      check_lineups: shouldCheckLineups, // if this is true, it will include the player from the bench if the current player is not playing. 5 minutes after the start of the match, this will become true, because the players' minutes are not calculated immediately after the start of the match, but a few minutes later.
      total_points: _elementLive.stats.total_points,
      total_points_live: getEventPlayerPoints(
        p,
        _elementLive,
        isCaptainActive,
        elementsBonus,
        shouldCheckLineups,
      ),
      fixture_started:
        elementFixture?.started ||
        dayjs().isAfter(dayjs(elementFixture?.kickoff_time)) ||
        false,
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

  const bench = eventPicksLinedUp.splice(11, 15);
  const goalKeepersM = eventPicksLinedUp.filter(p => p.element_type === 1);
  const defendersM = eventPicksLinedUp.filter(p => p.element_type === 2);
  const midfieldersM = eventPicksLinedUp.filter(p => p.element_type === 3);
  const forwardersM = eventPicksLinedUp.filter(p => p.element_type === 4);

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
  shouldCheckLineups: boolean, // bonus points will be included 5 minutes after the match has started as `shouldCheckLineups` will become true on that time
) => {
  let totalPoints = elementLive.stats.total_points;
  const bonus = elementsBonus.find(eb => eb.id === elementLive.id)?.bonus || 0;

  if (!elementLive.stats.bonus && elementLive.stats.bps && shouldCheckLineups) {
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
  const initialBench: TeamPlayerDelegate[] = players.filter(
    p =>
      !p.multiplier &&
      p.status !== 'i' &&
      (!p.fixture_finished || (p.fixture_finished && p.minutes)),
  ); // players that were initially on the bench and that are not inactive
  const benchLineups: TeamPlayerDelegate[] = []; // players that are included in the lineup because some of the first 11 do not play

  return players.map(p => {
    let inLineup = true;
    if (!p.multiplier) {
      // is not in first 11 - check if benchLineups contains the player, if yes, set lineup to true
      inLineup = benchLineups.some(bl => bl.id === p.id);
    } else {
      if (p.fixture_started && p.check_lineups && !p.minutes) {
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
