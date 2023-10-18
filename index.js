import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SessionProvider} from '@services/sessionContext';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) =>
    addPlugin({queryClient}),
  );
}

const WrappedApp = () => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <App />
    </SessionProvider>
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => WrappedApp);
