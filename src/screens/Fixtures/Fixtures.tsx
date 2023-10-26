import {View, Text} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './Fixtures.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Touchable from '@components/common/Touchable';
import {useQuery} from '@tanstack/react-query';
import {fetchBootstrapStatic, fetchFixtures} from '@services/api';
import ChevronLeftIcon from '@assets/svgs/ChevronLeftIcon';
import ChevronRightIcon from '@assets/svgs/ChevronRightIcon';
import LoadingView from '@components/common/LoadingView';
import {filterEventFixtures} from '@utils/filterEventFixtures';

type Props = {};

const Fixtures = ({}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(0);
  const [viewingEventId, setViewingEventId] = useState(0);

  const {data: bData} = useQuery(['bootstrapStatic'], fetchBootstrapStatic, {
    cacheTime: Infinity,
    onSuccess: _bData => {
      let currentEvent = _bData.events.find(e => e.is_current);
      const fixturesEventId =
        currentEvent?.finished &&
        currentEvent.id < _bData.phases?.[0]?.stop_event
          ? (currentEvent?.id || 0) + 1
          : currentEvent?.id || 0;

      setCurrentEventId(fixturesEventId);
      setViewingEventId(fixturesEventId);
    },
  });

  const {data: fxData, isFetching: fxFetching} = useQuery(
    ['fixtures'],
    fetchFixtures,
    {cacheTime: Infinity},
  );

  const previousEventHandler = async () =>
    setViewingEventId(prevState => prevState - 1);

  const nextEventHandler = async () =>
    setViewingEventId(prevState => prevState + 1);

  const data = useMemo(
    () => filterEventFixtures(bData?.teams, fxData, viewingEventId),
    [bData?.teams, fxData, viewingEventId],
  );

  if (fxFetching || !currentEventId) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
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
    </SafeAreaView>
  );
};

export default Fixtures;
