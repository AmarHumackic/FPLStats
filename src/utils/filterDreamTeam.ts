import {
  DreamTeamPlayer,
  DreamTeamTopPlayer,
  GWDreamTeamDelegate,
  GWLiveDelegate,
  PlayerDelegate,
  TeamDelegate,
} from 'src/types/api';

export const filterDreamTeam = (
  elements?: PlayerDelegate[],
  teams?: TeamDelegate[],
  elementsLive?: GWLiveDelegate['elements'],
  dtData?: GWDreamTeamDelegate | undefined,
  isOverallView?: boolean,
) => {
  if (!elements?.length || !teams?.length || !elementsLive?.length || !dtData) {
    return {
      topPlayer: null,
      goalKeepersM: [],
      defendersM: [],
      midfieldersM: [],
      forwardersM: [],
      eventPoints: 0,
    };
  }

  const topPlayerElement = elements.find(el => el.id === dtData.top_player.id)!;
  const topPlayerElementLive = elementsLive.find(
    el => el.id === dtData.top_player.id,
  )!;
  const topPlayer: DreamTeamTopPlayer = {
    id: topPlayerElement?.id,
    web_name: topPlayerElement?.web_name,
    points: dtData.top_player.points,
    element_type: topPlayerElement?.element_type,
    news: topPlayerElement.news,
    team: topPlayerElement.team,
    code: topPlayerElement.code,
    team_name: teams.find(t => t.id === topPlayerElement.team)?.name || '',
    minutes: isOverallView
      ? topPlayerElement.minutes
      : topPlayerElementLive?.stats.minutes,
    goals_scored: isOverallView
      ? topPlayerElement.goals_scored
      : topPlayerElementLive?.stats.goals_scored,
    assists: isOverallView
      ? topPlayerElement.assists
      : topPlayerElementLive.stats.assists,
    clean_sheets: isOverallView
      ? topPlayerElement.clean_sheets
      : topPlayerElementLive?.stats.clean_sheets,
    goals_conceded: isOverallView
      ? topPlayerElement.goals_conceded
      : topPlayerElementLive?.stats.goals_conceded,
    own_goals: isOverallView
      ? topPlayerElement.own_goals
      : topPlayerElementLive?.stats.own_goals,
    penalties_saved: isOverallView
      ? topPlayerElement.penalties_saved
      : topPlayerElementLive?.stats.penalties_saved,
    penalties_missed: isOverallView
      ? topPlayerElement.penalties_missed
      : topPlayerElementLive?.stats.penalties_missed,
    yellow_cards: isOverallView
      ? topPlayerElement.yellow_cards
      : topPlayerElementLive?.stats.yellow_cards,
    red_cards: isOverallView
      ? topPlayerElement.red_cards
      : topPlayerElementLive?.stats.red_cards,
    saves: isOverallView
      ? topPlayerElement.saves
      : topPlayerElementLive?.stats.saves,
  };

  const players: DreamTeamPlayer[] = dtData.team.map(el => {
    const playerElement = elements.find(pEl => pEl.id === el.element)!;
    const playerElementLive = elementsLive.find(pEl => pEl.id === el.element)!;
    return {
      tsType: 'DreamTeamPlayer',
      id: el.element,
      web_name: playerElement?.web_name,
      points: el.points,
      element_type: playerElement?.element_type,
      news: playerElement?.news,
      team: playerElement.team,
      code: playerElement.code,
      minutes: isOverallView
        ? playerElement.minutes
        : playerElementLive?.stats.minutes,
      goals_scored: isOverallView
        ? playerElement.goals_scored
        : playerElementLive?.stats.goals_scored,
      assists: isOverallView
        ? playerElement.assists
        : playerElementLive.stats.assists,
      clean_sheets: isOverallView
        ? playerElement.clean_sheets
        : playerElementLive?.stats.clean_sheets,
      goals_conceded: isOverallView
        ? playerElement.goals_conceded
        : playerElementLive?.stats.goals_conceded,
      own_goals: isOverallView
        ? playerElement.own_goals
        : playerElementLive?.stats.own_goals,
      penalties_saved: isOverallView
        ? playerElement.penalties_saved
        : playerElementLive?.stats.penalties_saved,
      penalties_missed: isOverallView
        ? playerElement.penalties_missed
        : playerElementLive?.stats.penalties_missed,
      yellow_cards: isOverallView
        ? playerElement.yellow_cards
        : playerElementLive?.stats.yellow_cards,
      red_cards: isOverallView
        ? topPlayerElement.red_cards
        : playerElementLive?.stats.red_cards,
      saves: isOverallView
        ? playerElement.saves
        : playerElementLive?.stats.saves,
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
