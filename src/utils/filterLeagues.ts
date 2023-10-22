import {UserDelegate, H2HLeagueDetailsDelegate} from 'src/types/api';

const broadcasterLFilter = 'brd'; // short_name starts with 'brd'

export const filterLeagues = (leagues?: UserDelegate['leagues']) => {
  const invClassicL: UserDelegate['leagues']['classic'] = [],
    invHeadL: H2HLeagueDetailsDelegate[] = [],
    publicClassicL: UserDelegate['leagues']['classic'] = [],
    publicHeadL: H2HLeagueDetailsDelegate[] = [],
    generalL: UserDelegate['leagues']['classic'] = [], // short_name starts with 'region' or 'event' or 'overall' or 'sc'
    broadcasterL: UserDelegate['leagues']['classic'] = []; // short_name starts with 'brd'

  if (leagues?.classic?.length) {
    invClassicL.push(...leagues.classic.filter(l => l.league_type === 'x'));
    publicClassicL.push(...leagues.classic.filter(l => l.league_type === 'c'));
    generalL.push(
      ...leagues.classic.filter(
        l =>
          l.league_type === 's' && !l.short_name.startsWith(broadcasterLFilter),
      ),
    );
    broadcasterL.push(
      ...leagues.classic.filter(
        l =>
          l.league_type === 's' && l.short_name.startsWith(broadcasterLFilter),
      ),
    );
  }

  if (leagues?.h2h?.length) {
    invHeadL.push(...leagues.h2h.filter(l => l.league_type === 'x'));
    publicHeadL.push(...leagues.h2h.filter(l => l.league_type === 'c'));
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
