import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Team.styles';
import {useQuery} from '@tanstack/react-query';
import {fetchBootstrapStatic, fetchManagerEventPicks} from '@services/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import Touchable from '@components/common/Touchable';
import ChevronLeftIcon from '@assets/svgs/ChevronLeft';
import ChevronRightIcon from '@assets/svgs/ChevronRight';
import {useSessionContext} from '@services/sessionContext';

type Props = {};

const Team = ({}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(-1);
  const {teamId} = useSessionContext();

  const {data: bootstrapData} = useQuery(
    ['bootstrapStatic'],
    fetchBootstrapStatic,
    {cacheTime: Infinity},
  );

  const currentEvent = bootstrapData.events.find(e => e.is_current);

  const {data: eventPicksData} = useQuery(
    ['managerEventPicks', teamId, currentEvent.id],
    () => fetchManagerEventPicks(teamId, currentEvent.id),
  );

  const previousEventHandler = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Touchable
          style={styles.chevronContainer}
          onPress={previousEventHandler}>
          <ChevronLeftIcon />
        </Touchable>
        <Text style={styles.eventNameLabel}>{currentEvent?.name}</Text>
        <Touchable
          style={styles.chevronContainer}
          onPress={previousEventHandler}>
          <ChevronRightIcon />
        </Touchable>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsValue}>
          {eventPicksData.entry_history.points}
        </Text>
        <Text style={styles.pointsLabel}> points</Text>
      </View>
    </SafeAreaView>
  );
};

export default Team;
