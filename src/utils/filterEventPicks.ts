import {
  FixtureDelegate,
  GWLiveDelegate,
  PickDelegate,
  PlayerDelegate,
  PlayerIdBonus,
  PlayerPickEventLiveDelegate,
} from 'src/types/api';
import {getElementsBonus} from './getElementsBonus';

export const filterEventPicks = (
  elements?: PlayerDelegate[],
  picks?: PickDelegate[],
  elementsLive?: GWLiveDelegate['elements'],
  fixtures?: FixtureDelegate[],
  event?: number,
) => {
  if (
    !elements ||
    !elements.length ||
    !picks ||
    !picks.length ||
    !elementsLive ||
    !elementsLive.length ||
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
    };
  }

  const elementsBonus = getElementsBonus(fixtures, elementsLive, event);

  const captain = picks.find(p => p.is_captain);
  const isCaptainActive =
    (
      elementsLive?.find(
        el => el.id === captain?.element,
      ) as GWLiveDelegate['elements'][0]
    )?.stats.minutes > 0;

  const eventPicks: PlayerPickEventLiveDelegate[] = picks.map(p => {
    const _element = elements.find(el => el.id === p.element) as PlayerDelegate;
    const _elementLive = elementsLive?.find(
      el => el.id === p.element,
    ) as GWLiveDelegate['elements'][0];
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
