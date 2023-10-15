import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '@navigation/BottomTab';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchBootstrapStatic} from '@services/api';
import {getSession} from '@services/session';
import Auth from '@screens/Auth';
import Toast from 'react-native-toast-message';

const App = () => {
  const queryClient = useQueryClient();

  const {data: teamId} = useQuery(['teamId']);

  console.log('teamId', teamId);

  const prefetchBootstrap = useCallback(
    async () =>
      await queryClient.prefetchQuery(
        ['bootstrapStatic'],
        fetchBootstrapStatic,
        {
          cacheTime: Infinity,
        },
      ),
    [queryClient],
  );

  const checkSession = useCallback(async () => {
    const session = await getSession();

    if (session) {
      queryClient.setQueryData(['teamId'], session); // store session in a cache to have it globally available
      prefetchBootstrap();
    }
  }, [queryClient, prefetchBootstrap]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <NavigationContainer>
      {teamId ? <BottomTab /> : <Auth />}

      <Toast />
    </NavigationContainer>
  );
};

export default App;
