import {View, Text} from 'react-native';
import React, {useMemo, useState} from 'react';
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
import Touchable from '@components/common/Touchable';
import ChevronLeftIcon from '@assets/svgs/ChevronLeft';
import ChevronRightIcon from '@assets/svgs/ChevronRight';
import {useSessionContext} from '@services/sessionContext';
import LoadingView from '@components/common/LoadingView';
import {filterEventPicks} from '@utils/filterEventPicks';
import EventPicksView from '@components/Team/EventPicksView';

type Props = {};

const Team = ({}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(0);
  const [viewingEventId, setViewingEventId] = useState(0);
  const {teamId} = useSessionContext();

  const {data: bData} = useQuery(['bootstrapStatic'], fetchBootstrapStatic, {
    cacheTime: Infinity,
    onSuccess: _bData => {
      const currentEvent = _bData.events.find(e => e.is_current);
      setCurrentEventId(currentEvent?.id || 0);
      setViewingEventId(currentEvent?.id || 0);
    },
  });

  const {data: manager, isFetching: managerFetching} = useQuery(
    ['managerInfo', teamId],
    () => fetchManager(teamId),
    {cacheTime: Infinity},
  );

  const {data: epData, isFetching: epFetching} = useQuery(
    ['managerEventPicks', teamId, viewingEventId],
    () => fetchManagerEventPicks(teamId, viewingEventId),
    {
      enabled: currentEventId ? true : false,
      staleTime: 10000,
    },
  );

  const {data: elData, isFetching: elFetching} = useQuery(
    ['managerLive', viewingEventId],
    () => fetchEventLive(viewingEventId),
    {
      enabled: currentEventId ? true : false,
      staleTime: 10000,
    },
  );

  const {data: fixturesData, isFetching: fixturesFetching} = useQuery(
    ['fixtures'],
    fetchFixtures,
    {staleTime: 10000},
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
  } = useMemo(
    () =>
      filterEventPicks(
        bData?.elements,
        epData?.picks,
        elData?.elements,
        fixturesData,
        viewingEventId,
      ),
    [
      bData?.elements,
      epData?.picks,
      elData?.elements,
      fixturesData,
      viewingEventId,
    ],
  );

  if (
    managerFetching ||
    epFetching ||
    elFetching ||
    fixturesFetching ||
    !currentEventId
  ) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.teamNameLabel}>
          {manager?.name}
          <Text
            style={
              styles.playerNameLabel
            }>{` (${manager?.player_first_name} ${manager?.player_last_name})`}</Text>
        </Text>
        <View style={styles.eventSwitchContainer}>
          <Touchable
            disabled={viewingEventId <= 1}
            style={styles.chevronContainer}
            onPress={previousEventHandler}>
            <ChevronLeftIcon />
          </Touchable>
          <Text
            style={styles.eventNameLabel}>{`Gameweek ${viewingEventId}`}</Text>
          <Touchable
            disabled={viewingEventId >= currentEventId}
            style={styles.chevronContainer}
            onPress={nextEventHandler}>
            <ChevronRightIcon />
          </Touchable>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsValue}>{eventPoints}</Text>
          <Text style={styles.pointsLabel}> points</Text>
        </View>

        <View style={styles.activeChipContainer}>
          {epData?.active_chip && (
            <Text style={styles.activeChipLabel}>{epData.active_chip}</Text>
          )}
        </View>
      </View>

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
