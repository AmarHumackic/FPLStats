import {
  GWLiveDelegate,
  PickDelegate,
  PlayerDelegate,
  PlayerPickEventLiveDelegate,
} from 'src/types/api';

export const filterEventPicks = (
  elements?: PlayerDelegate[],
  picks?: PickDelegate[],
  elementsLive?: GWLiveDelegate['elements'],
) => {
  if (!elements || !elements.length || !picks || !picks.length) {
    return [];
  }

  const eventPicks: PlayerPickEventLiveDelegate[] = picks.map(p => ({
    ...(elements.find(el => el.id === p.element) as PlayerDelegate),
    ...p,
    ...(elementsLive?.find(
      el => el.id === p.element,
    ) as GWLiveDelegate['elements'][0]),
  }));

  return eventPicks;
};
