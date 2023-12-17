import {
  UserDelegate,
  CustomLeagueCup,
  H2HLeagueDetailsDelegate,
} from 'src/types/api';

const broadcasterLFilter = 'brd'; // short_name starts with 'brd'

const mapLeagueData = (
  league: UserDelegate['leagues']['classic'][0] | H2HLeagueDetailsDelegate,
  matches: UserDelegate['leagues']['cup_matches'],
  teamId: number,
) => {
  const cupMatch = matches.find(m => m.league === league?.cup_league);
  const isWinning = cupMatch
    ? cupMatch?.entry_1_entry === teamId
      ? cupMatch?.entry_1_points > cupMatch.entry_2_points
      : cupMatch?.entry_2_points > cupMatch?.entry_1_points
    : null;

  return {
    id: league.id,
    name: league.name,
    entry_rank: league.entry_rank,
    entry_last_rank: league.entry_last_rank,
    has_cup: league.has_cup,
    event: cupMatch?.event || null,
    entry_1_points: cupMatch?.entry_1_points || null,
    entry_2_points: cupMatch?.entry_2_points || null,
    isWinning,
    is_knockout: cupMatch?.is_knockout || null,
    is_bye: cupMatch?.is_bye || null,
  };
};

export const filterLeagues = (
  leagues?: UserDelegate['leagues'],
  teamId?: number,
) => {
  const invClassicL: CustomLeagueCup[] = [],
    invHeadL: CustomLeagueCup[] = [],
    publicClassicL: CustomLeagueCup[] = [],
    publicHeadL: CustomLeagueCup[] = [],
    generalL: CustomLeagueCup[] = [], // short_name starts with 'region' or 'event' or 'overall' or 'sc'
    broadcasterL: CustomLeagueCup[] = []; // short_name starts with 'brd'

  if (leagues?.classic?.length && teamId) {
    invClassicL.push(
      ...leagues.classic
        .filter(l => l.league_type === 'x')
        .map(l => mapLeagueData(l, leagues.cup_matches, teamId)),
    );
    publicClassicL.push(
      ...leagues.classic
        .filter(l => l.league_type === 'c')
        .map(l => mapLeagueData(l, leagues.cup_matches, teamId)),
    );
    generalL.push(
      ...leagues.classic
        .filter(
          l =>
            l.league_type === 's' &&
            !l.short_name.startsWith(broadcasterLFilter),
        )
        .map(l => mapLeagueData(l, leagues.cup_matches, teamId)),
    );
    broadcasterL.push(
      ...leagues.classic
        .filter(
          l =>
            l.league_type === 's' &&
            l.short_name.startsWith(broadcasterLFilter),
        )
        .map(l => mapLeagueData(l, leagues.cup_matches, teamId)),
    );
  }

  if (leagues?.h2h?.length && teamId) {
    invHeadL.push(
      ...leagues.h2h
        .filter(l => l.league_type === 'x')
        .map(l => mapLeagueData(l, leagues.cup_matches, teamId)),
    );
    publicHeadL.push(
      ...leagues.h2h
        .filter(l => l.league_type === 'c')
        .map(l => mapLeagueData(l, leagues.cup_matches, teamId)),
    );
  }

  return {
    invClassicL,
    invHeadL,
    publicClassicL,
    publicHeadL,
    generalL,
    broadcasterL,
  };
};
