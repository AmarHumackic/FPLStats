import React from 'react';
import {render} from '@testing-library/react-native';
import Auth from './Auth';
import {SessionProvider} from '@services/sessionContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

test('renders Auth screen correctly', () => {
  const {getByText} = render(
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Auth />
      </SessionProvider>
    </QueryClientProvider>,
  );

  const textElement = getByText('Enter your Team ID or Team Name');
  expect(textElement).toBeTruthy();
});
