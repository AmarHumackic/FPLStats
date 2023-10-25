import {Text} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps} from 'src/types/navigation';
import {fetchLeagueStandingsC} from '@services/api';
import {useInfiniteQuery} from '@tanstack/react-query';
import LoadingView from '@components/common/LoadingView';
import LeagueDetailsC from '@components/Leagues/LeagueDetailsC';
import TeamInfoModal from '@components/Leagues/TeamInfoModal';

type Props = StackScreenProps<LeaguesStackProps, 'LeagueDetails'>;

const LeagueDetails = ({navigation, route}: Props) => {
  const [teamIdModal, setTeamIdModal] = useState(0); // teamId to display modal with details
  const [teamNameModal, setTeamNameModal] = useState<string>();
  const [playerNameModal, setPlayerNameModal] = useState<string>();

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

  // const {
  //   data: hData,
  //   isFetching: hFetching,
  //   error: hError,
  //   isError: hIsError,
  // } = useQuery(['leagueH', leagueId], () => fetchLeagueStandingsH(leagueId), {
  //   enabled: type === 'h2h',
  //   staleTime: 10000,
  // });

  useLayoutEffect(() =>
    navigation.setOptions({
      headerTitle: leagueName,
    }),
  );

  const onTeamDetails = (teamId: number) =>
    navigation.navigate('Team', {teamId});

  const onInfoModal = (
    teamId: number,
    teamName?: string,
    playerName?: string,
  ) => {
    setTeamIdModal(teamId);
    setTeamNameModal(teamName);
    setPlayerNameModal(playerName);
  };

  let content;

  if (type === 'classic') {
    cFetching && !cFetchingNextPage
      ? (content = <LoadingView />)
      : cIsError
      ? (content = <Text>{JSON.stringify(cError)}</Text>)
      : cData &&
        (content = (
          <LeagueDetailsC
            data={cData}
            loadingNextPage={cFetchingNextPage}
            onTeam={onTeamDetails}
            onInfo={onInfoModal}
            onNextPage={() =>
              cHasNextPage && !cFetchingNextPage && cFetchNextPage()
            }
          />
        ));
  } else {
    content = null;
  }

  return (
    <>
      {content}
      <TeamInfoModal
        teamId={teamIdModal}
        teamName={teamNameModal}
        playerName={playerNameModal}
        onClose={() => onInfoModal(0, undefined, undefined)}
      />
    </>
  );
};

export default LeagueDetails;
