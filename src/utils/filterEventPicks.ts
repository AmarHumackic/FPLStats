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

    _elementLive.stats.total_points_live = getEventPoints(
      p,
      _elementLive,
      isCaptainActive,
      elementsBonus,
    );

    return {
      ..._element,
      ...p,
      ..._elementLive,
      custom: {
        fixture_started: elementFixture?.started || false,
        rival_team_short_name:
          teams.find(t => t.id === rivalTeamId)?.short_name || '',
        fixture_home: rivalTeamId === elementFixture?.team_a ? true : false,
      },
    };
  });

  const goalKeepersM = eventPicks.filter(
    p => p.element_type === 1 && p.multiplier,
  );
  const defendersM = eventPicks.filter(
    p => p.element_type === 2 && p.multiplier,
  );
  const midfieldersM = eventPicks.filter(
    p => p.element_type === 3 && p.multiplier,
  );
  const forwardersM = eventPicks.filter(
    p => p.element_type === 4 && p.multiplier,
  );
  const bench = eventPicks.filter(p => !p.multiplier);
  const eventPoints = [
    ...goalKeepersM,
    ...defendersM,
    ...midfieldersM,
    ...forwardersM,
  ].reduce(
    (sum, item) =>
      sum + (item.stats.total_points_live || item.stats.total_points),
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

const getEventPoints = (
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
