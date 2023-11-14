import {View, Text, Image} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './DreamTeam.styles';
import {useQuery} from '@tanstack/react-query';
import {
  fetchBootstrapStatic,
  fetchEventDreamTeam,
  fetchEventLive,
  playerImageUri,
} from '@services/api';
import LoadingView from '@components/common/LoadingView';
import {SafeAreaView} from 'react-native-safe-area-context';
import EventPicksView from '@components/Team/EventPicksView';
import TeamInfo from '@components/Team/TeamInfo';
import {filterDreamTeam} from '@utils/filterDreamTeam';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps, TeamStackProps} from 'src/types/navigation';
import {getTeamShirt} from '@utils/getTeamShirt';
import {PosShortNameArr} from 'src/types/api';

type Props = StackScreenProps<TeamStackProps | LeaguesStackProps, 'DreamTeam'>;

const DreamTeam = ({}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(0);
  const [viewingEventId, setViewingEventId] = useState(0);
  const [imgError, setImgError] = useState(false);

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

  const {data: elData, isFetching: elFetching} = useQuery(
    ['eventLive', viewingEventId],
    () => fetchEventLive(viewingEventId),
    {
      enabled: currentEventId ? true : false,
      cacheTime: Infinity,
    },
  );

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
    () =>
      filterDreamTeam(
        bData?.elements,
        bData?.teams,
        elData?.elements,
        dtData,
        viewingEventId,
      ),
    [bData?.elements, bData?.teams, elData?.elements, dtData, viewingEventId],
  );

  if (elFetching || dtFetching || !currentEventId) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TeamInfo
        teamName={'Team of the Week'}
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

      <View style={styles.topPlayerContainer}>
        <Text style={styles.topPlayerText}>Top player</Text>
        <View style={styles.topPlayerRowContainer}>
          <View style={styles.topPlayerLeftContainer}>
            <Image
              source={
                imgError
                  ? getTeamShirt(topPlayer!.team, topPlayer!.element_type)
                  : {uri: playerImageUri(topPlayer!.code)}
              }
              style={styles.topPlayerImg}
              onError={() => setImgError(true)}
            />
            <Text style={styles.topPlayerName}>{topPlayer?.web_name}</Text>
          </View>
          <View style={styles.topPlayerCenterContainer}>
            <Text style={styles.topPlayerInfoText}>
              {PosShortNameArr[topPlayer!.element_type - 1]}
            </Text>
            <Text style={styles.topPlayerInfoText}>{topPlayer?.team_name}</Text>
            <Text style={styles.topPlayerInfoText}>{`${
              topPlayer?.goals_scored
            } goal${topPlayer?.goals_scored === 1 ? '' : 's'}`}</Text>
            <Text style={styles.topPlayerInfoText}>{`${
              topPlayer?.assists
            } assist${topPlayer?.assists === 1 ? '' : 's'}`}</Text>
          </View>
          <View style={styles.topPlayerRightContainer}>
            <Text style={styles.topPlayerPointsValue}>59</Text>
            <Text style={styles.topPlayerPointsLabel}>points</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DreamTeam;
