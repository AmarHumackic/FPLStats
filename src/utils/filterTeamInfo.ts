import {
  FixtureDelegate,
  GWLiveDelegate,
  GWPicksDelegate,
  PlayerDelegate,
  PlayerPickEventLiveDelegate,
} from 'src/types/api';
import {filterEventPicks} from './filterEventPicks';
import {chipsLabel} from './createStrEnum';

export const filterTeamInfo = (
  elements?: PlayerDelegate[],
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
  } = filterEventPicks(
    elements,
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
  ];

  const eFixtures = fixtures?.filter(f => f.event === event) || [];

  const captain = players?.find(
    e => e.id === eventPicks?.picks.find(ep => ep.is_captain)?.element,
  ) as PlayerPickEventLiveDelegate;
  const viceCaptain = players?.find(
    e => e.id === eventPicks?.picks.find(ep => ep.is_vice_captain)?.element,
  )?.web_name;
  const isCaptainActive = captain?.stats?.minutes > 0 ? true : false;

  return {
    captain: captain?.web_name || '',
    viceCaptain,
    isCaptainActive,
    activeChip: eventPicks?.active_chip && chipsLabel?.[eventPicks.active_chip],
    inPlay: players.filter(
      p =>
        p.stats.minutes > 0 &&
        eFixtures?.find(f => f.id === p.explain[0].fixture)?.finished === false,
    ).length,
    toStart: players.filter(
      p =>
        eFixtures?.find(f => f.id === p.explain[0].fixture)?.started === false,
    ).length, // TODO: check props ('starts', 'starts_per_90') during the matches
    eventPointsLive: eventPoints,
    yellowCards: players.reduce(
      (sum, item) => sum + (item?.stats?.yellow_cards || 0),
      0,
    ),
    redCards: players.reduce(
      (sum, item) => sum + (item?.stats?.red_cards || 0),
      0,
    ),
    dreamTeamPlayers: players.filter(p => p.stats.in_dreamteam).length,
    assists: players.reduce(
      (sum, item) => sum + (item?.stats?.assists || 0),
      0,
    ),
    goals: players.reduce(
      (sum, item) => sum + (item?.stats?.goals_scored || 0),
      0,
    ),
    creativity:
      players.reduce((sum, item) => sum + +(item?.stats?.creativity || 0), 0) /
      players.length,
    influence:
      players.reduce((sum, item) => sum + +(item?.stats?.influence || 0), 0) /
      players.length,
    threat:
      players.reduce((sum, item) => sum + +(item?.stats?.threat || 0), 0) /
      players.length,
  };
};
