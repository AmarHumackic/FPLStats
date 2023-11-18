import React, {useLayoutEffect, useMemo, useState} from 'react';
import styles from './Team.styles';
import {useQuery} from '@tanstack/react-query';
import {
  fetchBootstrapStatic,
  fetchEventLive,
  fetchFixtures,
  fetchManager,
  fetchManagerEventPicks,
} from '@services/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSessionContext} from '@services/sessionContext';
import LoadingView from '@components/common/LoadingView';
import {filterEventPicks} from '@utils/filterEventPicks';
import EventPicksView from '@components/Team/EventPicksView';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps, TeamStackProps} from 'src/types/navigation';
import {renderNavElement} from '@navigation/utils/renderNavElement';
import PopupMenu from '@components/common/PopupMenu';
import {PopupMenuModel} from 'src/types/common';
import StarIcon from '@assets/svgs/StarIcon';
import TeamInfo from '@components/Team/TeamInfo';
import SwapHorizontalIcon from '@assets/svgs/SwapHorizontalIcon';

type Props = StackScreenProps<TeamStackProps | LeaguesStackProps, 'Team'>;

const Team = ({navigation, route}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(0);
  const [viewingEventId, setViewingEventId] = useState(0);
  const {teamId: sessionTeamId} = useSessionContext();
  const teamId = route.params?.teamId || sessionTeamId;

  const {data: bData} = useQuery(['bootstrapStatic'], fetchBootstrapStatic, {
    cacheTime: Infinity,
    onSuccess: _bData => {
      if (!currentEventId) {
        const currentEvent = _bData.events.find(e => e.is_current);
        setCurrentEventId(currentEvent?.id || 0);
        setViewingEventId(currentEvent?.id || 0);
      }
    },
  });

  const {data: manager, isFetching: managerFetching} = useQuery(
    ['managerInfo', teamId],
    () => fetchManager(teamId),
    {staleTime: 20000},
  );

  const {data: epData, isFetching: epFetching} = useQuery(
    ['managerEventPicks', teamId, viewingEventId],
    () => fetchManagerEventPicks(teamId, viewingEventId),
    {
      enabled: currentEventId ? true : false,
      staleTime: 20000,
    },
  );

  const {data: elData, isFetching: elFetching} = useQuery(
    ['eventLive', viewingEventId],
    () => fetchEventLive(viewingEventId),
    {
      enabled: currentEventId ? true : false,
      staleTime: Infinity,
    },
  );

  const {data: fxData, isFetching: fxFetching} = useQuery(
    ['fixtures'],
    fetchFixtures,
    {staleTime: Infinity},
  );

  const dropdownList: PopupMenuModel[] = useMemo(
    () => [
      {
        label: 'View Dream Team',
        icon: <StarIcon width={20} height={20} />,
        onPress: () => navigation.navigate('DreamTeam'),
      },
      {
        label: 'View Transfers',
        icon: <SwapHorizontalIcon width={20} height={20} />,
        onPress: () =>
          navigation.navigate('Transfers', {
            teamId,
            teamName: manager?.name,
          }),
      },
    ],
    [navigation, teamId, manager?.name],
  );

  useLayoutEffect(() =>
    navigation.setOptions({
      headerRight: () =>
        renderNavElement(
          <PopupMenu dropdownList={dropdownList || []} fontSize={'small'} />,
        ),
    }),
  );

  const previousEventHandler = async () =>
    setViewingEventId(prevState => prevState - 1);

  const nextEventHandler = async () =>
    setViewingEventId(prevState => prevState + 1);

  const {
    goalKeepersM,
    defendersM,
    midfieldersM,
    forwardersM,
    bench,
    eventPoints,
    eventTransfers,
    eventTransfersCost,
    avgEventScore,
    highestEventScore,
    highestEventScoreId,
  } = useMemo(() => {
    const currentEventData = bData?.events.find(e => e.id === viewingEventId);

    return {
      ...filterEventPicks(
        bData?.elements,
        bData?.teams,
        epData?.picks,
        elData?.elements,
        fxData,
        viewingEventId,
      ),
      eventTransfers: epData?.entry_history?.event_transfers,
      eventTransfersCost: epData?.entry_history.event_transfers_cost,
      avgEventScore: currentEventData?.average_entry_score,
      highestEventScore: currentEventData?.highest_score || undefined,
      highestEventScoreId: currentEventData?.highest_scoring_entry || undefined,
    };
  }, [
    bData?.elements,
    bData?.events,
    bData?.teams,
    epData?.picks,
    epData?.entry_history,
    elData?.elements,
    fxData,
    viewingEventId,
  ]);

  if (
    managerFetching ||
    epFetching ||
    elFetching ||
    fxFetching ||
    !currentEventId
  ) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TeamInfo
        teamName={manager?.name}
        managerName={`${manager?.player_first_name} ${manager?.player_last_name}`}
        viewingEventId={viewingEventId}
        currentEventId={currentEventId}
        onPreviousEvent={previousEventHandler}
        onNextEvent={nextEventHandler}
        eventTransfers={eventTransfers}
        eventTransfersCost={eventTransfersCost}
        avgEventScore={avgEventScore}
        eventPoints={eventPoints}
        highestEventScoreId={highestEventScoreId}
        highestEventScore={highestEventScore}
        activeChip={epData?.active_chip}
      />

      <EventPicksView
        goalKeepersM={goalKeepersM}
        defendersM={defendersM}
        midfieldersM={midfieldersM}
        forwardersM={forwardersM}
        bench={bench}
      />
    </SafeAreaView>
  );
};

export default Team;
