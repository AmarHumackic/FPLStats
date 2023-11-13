import {
  FixtureDelegate,
  GWLiveDelegate,
  GWPicksDelegate,
  PlayerDelegate,
  TeamDelegate,
  TeamPlayerDelegate,
} from 'src/types/api';
import {filterEventPicks} from './filterEventPicks';
import {chipsLabel} from './createStrEnum';

export const filterTeamInfo = (
  elements?: PlayerDelegate[],
  teams?: TeamDelegate[],
  eventPicks?: GWPicksDelegate,
  elementsLive?: GWLiveDelegate['elements'],
  fixtures?: FixtureDelegate[],
  event?: number,
) => {
  const {
    goalKeepersM,
    defendersM,
    midfieldersM,
    forwardersM,
    bench,
    eventPoints,
    isCaptainActive,
  } = filterEventPicks(
    elements,
    teams,
    eventPicks?.picks,
    elementsLive,
    fixtures,
    event,
  );

  const players = [
    ...goalKeepersM,
    ...defendersM,
    ...midfieldersM,
    ...forwardersM,
    ...bench,
  ].filter(el => el.in_lineup);

  const captainId = eventPicks?.picks.find(ep => ep.is_captain)?.element;
  const captain =
    (players?.find(p => p.id === captainId) as TeamPlayerDelegate)?.web_name ||
    '';
  const viceCaptainId = eventPicks?.picks.find(
    ep => ep.is_vice_captain,
  )?.element;
  const viceCaptain =
    (players?.find(e => e.id === viceCaptainId) as TeamPlayerDelegate)
      ?.web_name || '';

  return {
    captain,
    viceCaptain,
    isCaptainActive,
    activeChip: eventPicks?.active_chip && chipsLabel?.[eventPicks.active_chip],
    inPlay: players.filter(p => p.fixture_started && !p.fixture_finished)
      .length,
    toStart: players.filter(p => !p.fixture_started && !p.fixture_finished)
      .length,
    eventPointsLive: eventPoints,
    yellowCards: players.reduce(
      (sum, item) => sum + (item?.yellow_cards || 0),
      0,
    ),
    redCards: players.reduce((sum, item) => sum + (item?.red_cards || 0), 0),
    dreamTeamPlayers: players.filter(p => p.in_dreamteam).length,
    assists: players.reduce((sum, item) => sum + (item?.assists || 0), 0),
    goals: players.reduce((sum, item) => sum + (item?.goals_scored || 0), 0),
    creativity:
      players.reduce((sum, item) => sum + +(item?.creativity || 0), 0) /
      players.length,
    influence:
      players.reduce((sum, item) => sum + +(item?.influence || 0), 0) /
      players.length,
    threat:
      players.reduce((sum, item) => sum + +(item?.threat || 0), 0) /
      players.length,
  };
};
