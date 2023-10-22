import React from 'react';
import {useState, ReactNode} from 'react';
import {
  getSessionStorage,
  removeSessionStorage,
  setSessionStorage,
} from './sessionStorage';
import {useQueryClient} from '@tanstack/react-query';
import {fetchBootstrapStatic, fetchManager} from './api';
import {createGenericContext} from './createGenericContext';

export type SessionContextProps = {
  teamId: number;
  loadingSession: boolean;
  checkSessionHandler: () => Promise<void>;
  setSessionHandler: (teamId: number) => Promise<void>;
  removeSessionHandler: () => void;
};

export const [useSessionContext, SessionContextProvider] =
  createGenericContext<SessionContextProps>();

export const SessionProvider = ({children}: {children: ReactNode}) => {
  const [teamId, setTeamId] = useState<number>(0);
  const [loadingSession, setLoadingSession] = useState(true);

  const queryClient = useQueryClient();

  const prefetchBootstrap = async () =>
    await queryClient.prefetchQuery(['bootstrapStatic'], fetchBootstrapStatic, {
      cacheTime: Infinity,
    });

  const prefetchManager = async (_teamId: number) =>
    await queryClient.prefetchQuery(
      ['managerInfo', _teamId],
      () => fetchManager(_teamId),
      {
        cacheTime: Infinity,
      },
    );

  const checkSessionHandler = async () => {
    const session = await getSessionStorage(); // fetch session from async storage

    if (session) {
      await prefetchBootstrap();
      await prefetchManager(session);
      setTeamId(session); // store session in the context to have it globally available
      setLoadingSession(false);
    } else {
      setLoadingSession(false);
    }
  };

  const setSessionHandler = async (_teamId: number) => {
    await prefetchBootstrap();
    await prefetchManager(_teamId);
    await setSessionStorage(_teamId); // store session to async storage
    setTeamId(_teamId); // store session to the context
  };

  const removeSessionHandler = async () => {
    setTeamId(0); // remove session from the context
    await removeSessionStorage(); // remove session from async storage
  };

  return (
    <SessionContextProvider
      value={{
        teamId,
        loadingSession,
        checkSessionHandler,
        setSessionHandler,
        removeSessionHandler,
      }}>
      {children}
    </SessionContextProvider>
  );
};
