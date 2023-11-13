import {
  DreamTeamPlayer,
  GWDreamTeamDelegate,
  PlayerDelegate,
} from 'src/types/api';

export const filterDreamTeam = (
  elements?: PlayerDelegate[],
  dtData?: GWDreamTeamDelegate | undefined,
  event?: number,
) => {
  if (!elements?.length || !dtData || !event) {
    return {
      topPlayer: {},
      goalKeepersM: [],
      defendersM: [],
      midfieldersM: [],
      forwardersM: [],
      eventPoints: 0,
    };
  }

  const topPlayerElement = elements.find(el => el.id === dtData.top_player.id)!;
  const topPlayer: DreamTeamPlayer = {
    tsType: 'DreamTeamPlayer',
    id: topPlayerElement?.id,
    web_name: topPlayerElement?.web_name,
    points: topPlayerElement?.event_points,
    element_type: topPlayerElement?.element_type,
    news: topPlayerElement.news,
    team: topPlayerElement.team,
    code: topPlayerElement.code,
  };

  const players: DreamTeamPlayer[] = dtData.team.map(el => {
    const playerElement = elements.find(pEl => pEl.id === el.element)!;
    return {
      tsType: 'DreamTeamPlayer',
      id: el.element,
      web_name: playerElement?.web_name,
      points: el.points,
      element_type: playerElement?.element_type,
      news: playerElement?.news,
      team: playerElement.team,
      code: playerElement.code,
    };
  });

  const goalKeepersM = players.filter(p => p.element_type === 1);
  const defendersM = players.filter(p => p.element_type === 2);
  const midfieldersM = players.filter(p => p.element_type === 3);
  const forwardersM = players.filter(p => p.element_type === 4);

  const eventPoints = [
    ...goalKeepersM,
    ...defendersM,
    ...midfieldersM,
    ...forwardersM,
  ].reduce((sum, item) => sum + item.points, 0);

  return {
    topPlayer,
    goalKeepersM,
    defendersM,
    midfieldersM,
    forwardersM,
    eventPoints,
  };
};
