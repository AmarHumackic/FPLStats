import {View, Text} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './DreamTeam.styles';
import {useQuery} from '@tanstack/react-query';
import {fetchBootstrapStatic, fetchEventDreamTeam} from '@services/api';
import LoadingView from '@components/common/LoadingView';
import {SafeAreaView} from 'react-native-safe-area-context';
import EventPicksView from '@components/Team/EventPicksView';
import TeamInfo from '@components/Team/TeamInfo';
import {filterDreamTeam} from '@utils/filterDreamTeam';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps, TeamStackProps} from 'src/types/navigation';

type Props = StackScreenProps<TeamStackProps | LeaguesStackProps, 'DreamTeam'>;

const DreamTeam = ({}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(0);
  const [viewingEventId, setViewingEventId] = useState(0);

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

  const {data: dtData, isFetching: dtFetching} = useQuery(
    ['dreamTeam', viewingEventId],
    () => fetchEventDreamTeam(viewingEventId),
    {enabled: currentEventId ? true : false},
  );

  const previousEventHandler = async () =>
    setViewingEventId(prevState => prevState - 1);

  const nextEventHandler = async () =>
    setViewingEventId(prevState => prevState + 1);

  const {
    topPlayer,
    goalKeepersM,
    defendersM,
    midfieldersM,
    forwardersM,
    eventPoints,
  } = useMemo(
    () => filterDreamTeam(bData?.elements, dtData, viewingEventId),
    [bData?.elements, dtData, viewingEventId],
  );

  if (dtFetching || !currentEventId) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TeamInfo
        teamName={'Dream Team'}
        // managerName={"Game"}
        viewingEventId={viewingEventId}
        currentEventId={currentEventId}
        onPreviousEvent={previousEventHandler}
        onNextEvent={nextEventHandler}
        eventPoints={eventPoints}
      />

      <EventPicksView
        goalKeepersM={goalKeepersM}
        defendersM={defendersM}
        midfieldersM={midfieldersM}
        forwardersM={forwardersM}
      />
    </SafeAreaView>
  );
};

export default DreamTeam;
