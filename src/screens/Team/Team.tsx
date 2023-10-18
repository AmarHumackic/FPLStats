import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './Team.styles';
import {useQuery} from '@tanstack/react-query';
import {fetchBootstrapStatic, fetchManagerEventPicks} from '@services/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import Touchable from '@components/common/Touchable';
import ChevronLeftIcon from '@assets/svgs/ChevronLeft';
import ChevronRightIcon from '@assets/svgs/ChevronRight';
import {useSessionContext} from '@services/sessionContext';
import LoadingView from '@components/common/LoadingView';

type Props = {};

const Team = ({}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(0);
  const [currentEventName, setCurrentEventName] = useState('');
  const {teamId} = useSessionContext();

  const {data: bData} = useQuery(['bootstrapStatic'], fetchBootstrapStatic, {
    cacheTime: Infinity,
    onSuccess: _bData => {
      const currentEvent = bData.events.find(e => e.is_current);
      setCurrentEventId(currentEvent.id);
      setCurrentEventName(currentEvent.name);
    },
  });

  const {data: epData, isFetching: epFetching} = useQuery(
    ['managerEventPicks', teamId, currentEventId],
    () => fetchManagerEventPicks(teamId, currentEventId),
    {enabled: currentEventId ? true : false},
  );

  const previousEventHandler = async () => {};

  if (epFetching || !currentEventId) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Touchable
          style={styles.chevronContainer}
          onPress={previousEventHandler}>
          <ChevronLeftIcon />
        </Touchable>
        <Text style={styles.eventNameLabel}>{currentEventName}</Text>
        <Touchable
          style={styles.chevronContainer}
          onPress={previousEventHandler}>
          <ChevronRightIcon />
        </Touchable>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsValue}>{epData.entry_history.points}</Text>
        <Text style={styles.pointsLabel}> points</Text>
      </View>
    </SafeAreaView>
  );
};

export default Team;
