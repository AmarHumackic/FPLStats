import {PickDelegate, PlayerDelegate, PlayerPickDelegate} from 'src/types/api';

export const filterEventPicks = (
  elements?: PlayerDelegate[],
  picks?: PickDelegate[],
) => {
  if (!elements || !elements.length || !picks || !picks.length) {
    return [];
  }

  const eventPicks: PlayerPickDelegate[] = picks.map(p => ({
    ...(elements.find(el => el.id === p.element) as PlayerDelegate),
    ...p,
  }));

  return eventPicks;
};
