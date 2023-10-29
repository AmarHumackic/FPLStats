import {DateFixtures, FixtureDelegate, TeamDelegate} from 'src/types/api';
import dayjs from 'dayjs';

export const filterEventFixtures = (
  teams?: TeamDelegate[],
  eventFixtures?: FixtureDelegate[],
) => {
  if (!teams?.length || !eventFixtures?.length) {
    return {};
  }

  const kickOffTimes = [
    ...new Set(
      eventFixtures.map(ef => dayjs(ef.kickoff_time).format('YYYY-MM-DD')),
    ),
  ]; // map kick off times and remove duplicates

  const dateFixtures: DateFixtures = {};

  for (let index = 0; index < kickOffTimes.length; index++) {
    const element = kickOffTimes[index];

    if (element) {
      dateFixtures[element] = eventFixtures
        .filter(ef => dayjs(ef.kickoff_time).format('YYYY-MM-DD') === element)
        .map(el => {
          const teamH = teams.find(t => t.id === el.team_h);
          const teamA = teams.find(t => t.id === el.team_a);

          return {
            ...el,
            team_h_name: teamH?.name || '',
            team_h_code: teamH?.code || 0,
            team_a_name: teamA?.name || '',
            team_a_code: teamA?.code || 0,
          };
        });
    }
  }

  return dateFixtures;
};
