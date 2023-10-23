import {Text} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps} from 'src/types/navigation';
import {fetchLeagueStandingsC, fetchLeagueStandingsH} from '@services/api';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import LoadingView from '@components/common/LoadingView';
import LeagueDetailsC from '@components/Leagues/LeagueDetailsC';

type Props = StackScreenProps<LeaguesStackProps, 'LeagueDetails'>;

const LeagueDetails = ({navigation, route}: Props) => {
  const {leagueId, leagueName, type} = route.params;

  const {
    data: cData,
    isFetching: cFetching,
    error: cError,
    isError: cIsError,
    hasNextPage: cHasNextPage,
    isFetchingNextPage: cFetchingNextPage,
    fetchNextPage: cFetchNextPage,
  } = useInfiniteQuery(
    ['leagueC', leagueId],
    ({pageParam = 1}) => fetchLeagueStandingsC(leagueId, 1, pageParam, 1),
    {
      enabled: type === 'classic',
      staleTime: 10000,
      getNextPageParam: lastPage =>
        lastPage.standings.has_next ? lastPage.standings.page + 1 : undefined,
    },
  );

  const {
    data: hData,
    isFetching: hFetching,
    error: hError,
    isError: hIsError,
  } = useQuery(['leagueH', leagueId], () => fetchLeagueStandingsH(leagueId), {
    enabled: type === 'h2h',
    staleTime: 10000,
  });

  useLayoutEffect(() =>
    navigation.setOptions({
      headerTitle: leagueName,
    }),
  );

  const onTeamDetails = (teamId: number) =>
    navigation.navigate('Team', {teamId});

  if (type === 'classic') {
    return cFetching && !cFetchingNextPage ? (
      <LoadingView />
    ) : cIsError ? (
      <Text>{JSON.stringify(cError)}</Text>
    ) : (
      cData && (
        <LeagueDetailsC
          data={cData}
          loadingNextPage={cFetchingNextPage}
          onPress={onTeamDetails}
          onNextPage={() =>
            cHasNextPage && !cFetchingNextPage && cFetchNextPage()
          }
        />
      )
    );
  } else {
    return null;
  }
};

export default LeagueDetails;
