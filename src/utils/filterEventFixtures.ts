import {FixtureDelegate, TeamDelegate} from 'src/types/api';

export const filterEventFixtures = (
  teams?: TeamDelegate[],
  fixtures?: FixtureDelegate[],
  event?: number,
) => {
  if (!teams?.length || !fixtures?.length || !event) {
    return {};
  }

  const eventFixtures = fixtures.filter(f => f.event === event);

  const kickOffTimes = [...new Set(eventFixtures.map(ef => ef.kickoff_time))]; // map kick off times and remove duplicates

  console.log('kickOffTimes', kickOffTimes);
};
