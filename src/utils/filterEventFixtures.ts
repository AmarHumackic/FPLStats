import {
  DateFixtureStat,
  DateFixtures,
  FixtureDelegate,
  PlayerDelegate,
  TeamDelegate,
} from 'src/types/api';
import dayjs from 'dayjs';

export const filterEventFixtures = (
  elements?: PlayerDelegate[],
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
    const item = kickOffTimes[index];
    console.log('\n\n\n');
    if (item) {
      dateFixtures[item] = eventFixtures
        .filter(ef => dayjs(ef.kickoff_time).format('YYYY-MM-DD') === item)
        .map(el => {
          const teamH = teams.find(t => t.id === el.team_h);
          const teamA = teams.find(t => t.id === el.team_a);

          const customStats = el.stats
            .filter(s => s.identifier)
            .map(
              ({identifier, h, a}) =>
                ({
                  identifier,
                  h: h.map(({element, value}) => ({
                    element,
                    web_name: elements?.find(({id}) => id === element)
                      ?.web_name,
                    value,
                  })),
                  a: a.map(({element, value}) => ({
                    element,
                    web_name: elements?.find(({id}) => id === element)
                      ?.web_name,
                    value,
                  })),
                } as DateFixtureStat),
            );

          return {
            id: el.id,
            event: el.event,
            finished_provisional: el.finished_provisional,
            kickoff_time: el.kickoff_time,
            match_details: customStats,
            started: el.started,
            team_a_code: teamA?.code || 0,
            team_a_name: teamA?.name || '',
            team_a_score: el.team_a_score,
            team_h_code: teamH?.code || 0,
            team_h_name: teamH?.name || '',
            team_h_score: el.team_h_score,
          };
        });
    }
  }

  return dateFixtures;
};
