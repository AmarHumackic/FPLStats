import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './Fixtures.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Touchable from '@components/common/Touchable';
import {useQuery} from '@tanstack/react-query';
import {fetchBootstrapStatic, fetchEventFixtures} from '@services/api';
import ChevronLeftIcon from '@assets/svgs/ChevronLeftIcon';
import ChevronRightIcon from '@assets/svgs/ChevronRightIcon';
import LoadingView from '@components/common/LoadingView';
import {filterEventFixtures} from '@utils/filterEventFixtures';
import DateFixturesView from '@components/Fixtures/DateFixturesView';
import {colors} from '@constants/';

type Props = {};

const Fixtures = ({}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(0);
  const [viewingEventId, setViewingEventId] = useState(0);
  const [lastEventId, setLastEventId] = useState(0);

  const {data: bData} = useQuery(['bootstrapStatic'], fetchBootstrapStatic, {
    cacheTime: Infinity,
    onSuccess: _bData => {
      let currentEvent = _bData.events.find(e => e.is_current);
      const _lastEventId = _bData.phases?.[0]?.stop_event;
      const fixturesEventId =
        currentEvent?.finished && currentEvent.id < _lastEventId
          ? (currentEvent?.id || 0) + 1
          : currentEvent?.id || 0;

      setCurrentEventId(fixturesEventId);
      setViewingEventId(fixturesEventId);
      setLastEventId(_lastEventId);
    },
  });

  const {
    data: efData,
    isFetching: efFetching,
    refetch,
    isRefetching,
  } = useQuery(
    ['eventFixtures', viewingEventId],
    () => fetchEventFixtures(viewingEventId),
    {
      cacheTime: Infinity,
    },
  );

  const previousEventHandler = async () =>
    setViewingEventId(prevState => prevState - 1);

  const nextEventHandler = async () =>
    setViewingEventId(prevState => prevState + 1);

  const dateFixtures = useMemo(
    () => filterEventFixtures(bData?.teams, efData),
    [bData?.teams, efData],
  );

  if ((efFetching || !currentEventId) && !isRefetching) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Touchable
          disabled={viewingEventId <= 1}
          style={styles.chevronContainer}
          onPress={previousEventHandler}>
          <ChevronLeftIcon />
        </Touchable>
        <Text
          style={styles.eventNameLabel}>{`Gameweek ${viewingEventId}`}</Text>
        <Touchable
          disabled={viewingEventId >= lastEventId}
          style={styles.chevronContainer}
          onPress={nextEventHandler}>
          <ChevronRightIcon />
        </Touchable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            title="Pull to refresh"
            titleColor={colors.text}
            colors={[colors.text]}
            tintColor={colors.text}
          />
        }>
        {Object.keys(dateFixtures).map(df => (
          <DateFixturesView
            key={df}
            title={df}
            fixtures={dateFixtures?.[df] || []}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Fixtures;
