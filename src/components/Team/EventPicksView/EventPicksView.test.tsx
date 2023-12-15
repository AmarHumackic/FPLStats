import React from 'react';
import {render} from '@testing-library/react-native';
import EventPicksView from './EventPicksView';
import {TeamPlayerDelegate} from 'src/types/api';

const generateMockElements = () =>
  Array(15).map(
    (_, i) =>
      ({
        tsType: 'TeamPlayer',
        id: 1,
        element_type: 1,
        team: 1,
        code: 1,
        web_name: 'Test',
        news: '',
        status: 'a',
        is_captain: i === 5,
        is_vice_captain: i === 6,
        multiplier: i < 11 ? 1 : 0,
        in_dreamteam: true,
        minutes: 50,
        yellow_cards: 0,
        red_cards: 0,
        assists: 0,
        goals_scored: 0,
        creativity: '0',
        influence: '0',
        threat: '0',
        bps: 0,
        in_lineup: i < 11,
        check_lineups: false,
        total_points: 0,
        total_points_live: 0,
        fixture_started: true,
        fixture_finished: false,
        rival_team_short_name: 'BHA',
        fixture_home: true,
      } as TeamPlayerDelegate),
  );

test('verify 15 players are rendered on the screen (11 + 4)', () => {
  //   (useStateMock as jest.Mock).mockReturnValue([0, jest.fn()]);

  const mockElements = generateMockElements();

  const bench = mockElements.splice(11, 15);
  const goalKeepersM = mockElements.filter(p => p.element_type === 1);
  const defendersM = mockElements.filter(p => p.element_type === 2);
  const midfieldersM = mockElements.filter(p => p.element_type === 3);
  const forwardersM = mockElements.filter(p => p.element_type === 4);

  const {getByText} = render(
    <EventPicksView
      goalKeepersM={goalKeepersM}
      defendersM={defendersM}
      midfieldersM={midfieldersM}
      forwardersM={forwardersM}
      bench={bench}
    />,
  );

  // const element = getByText(mockElements[0].web_name);
});
