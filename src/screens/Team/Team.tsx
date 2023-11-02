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
import ChevronLeftIcon from '@assets/svgs/ChevronLeftIcon';
import ChevronRightIcon from '@assets/svgs/ChevronRightIcon';
import {useSessionContext} from '@services/sessionContext';
import LoadingView from '@components/common/LoadingView';
import {filterEventPicks} from '@utils/filterEventPicks';
import EventPicksView from '@components/Team/EventPicksView';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps, TeamStackProps} from 'src/types/navigation';
import {ChipTypes} from 'src/types/api';

type Props = StackScreenProps<TeamStackProps | LeaguesStackProps, 'Team'>;

const Team = ({route}: Props) => {
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
    ['eventLive', viewingEventId],
    () => fetchEventLive(viewingEventId),
    {
      enabled: currentEventId ? true : false,
      cacheTime: Infinity,
    },
  );

  const {data: fxData, isFetching: fxFetching} = useQuery(
    ['fixtures'],
    fetchFixtures,
    {cacheTime: Infinity},
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
        bData?.teams,
        epData?.picks,
        elData?.elements,
        fxData,
        viewingEventId,
      ),
    [
      bData?.elements,
      bData?.teams,
      epData?.picks,
      elData?.elements,
      fxData,
      viewingEventId,
    ],
  );

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
            <Text style={styles.activeChipLabel}>
              {ChipTypes?.[epData.active_chip] || ''}
            </Text>
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
