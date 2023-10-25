import {View, Text} from 'react-native';
import React, {useMemo, useState} from 'react';
import Modal from 'react-native-modal';
import styles from './TeamInfoModal.styles';
import {useQuery} from '@tanstack/react-query';
import {
  fetchBootstrapStatic,
  fetchEventLive,
  fetchFixtures,
  fetchManagerEventPicks,
} from '@services/api';
import {filterTeamInfo} from '@utils/filterTeamInfo';
import LoadingView from '@components/common/LoadingView';
import Captain from '@components/common/Captain';
import SoccerCard from '@components/common/SoccerCard';

type Props = {
  teamId: number | undefined;
  teamName: string | undefined;
  playerName: string | undefined;
  onClose: () => void;
};

const TeamInfoModal = ({teamId, teamName, playerName, onClose}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(0);

  const {data: bData} = useQuery(['bootstrapStatic'], fetchBootstrapStatic, {
    cacheTime: Infinity,
    onSuccess: _bData => {
      const currentEvent = _bData.events.find(e => e.is_current);
      setCurrentEventId(currentEvent?.id || 0);
    },
  });

  const {data: epData, isFetching: epFetching} = useQuery(
    ['managerEventPicks', teamId, currentEventId],
    () => fetchManagerEventPicks(teamId as number, currentEventId),
    {
      enabled: currentEventId && teamId ? true : false,
      staleTime: 10000,
    },
  );

  const {data: elData, isFetching: elFetching} = useQuery(
    ['eventLive', currentEventId],
    () => fetchEventLive(currentEventId),
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

  const {
    captain,
    viceCaptain,
    isCaptainActive,
    activeChip,
    inPlay,
    toStart,
    eventPointsLive,
    yellowCards,
    redCards,
    dreamTeamPlayers,
    assists,
    goals,
    creativity,
    influence,
    threat,
  } = useMemo(
    () =>
      filterTeamInfo(
        bData?.elements,
        epData,
        elData?.elements,
        fxData,
        currentEventId,
      ),
    [bData?.elements, epData, elData?.elements, fxData, currentEventId],
  );

  if (epFetching || elFetching || fxFetching || !currentEventId) {
    return <LoadingView withoutTitle />;
  }

  return (
    <View>
      <Modal
        isVisible={teamId ? true : false}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerTitle}>
            {`${teamName} (${playerName}) - GW ${currentEventId}`}
          </Text>
          <Text
            style={
              styles.centerText
            }>{`Event Points Live: ${eventPointsLive}`}</Text>

          <View style={styles.rowContainer}>
            <View style={styles.captainContainer}>
              <Captain type={isCaptainActive ? 'C' : 'V'} marginRight={8} />
              <Text>{isCaptainActive ? captain : viceCaptain}</Text>
            </View>
            <Text style={styles.label}>
              Active Chip: <Text style={styles.value}>{activeChip || '-'}</Text>
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>
              In Play: <Text style={styles.value}>{inPlay}</Text>
            </Text>
            <Text style={styles.label}>
              To Start: <Text style={styles.value}>{toStart}</Text>
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.captainContainer}>
              <SoccerCard marginRight={4} />
              <Text style={styles.label}>
                : <Text style={styles.value}>{yellowCards}</Text>
              </Text>
            </View>
            <View style={styles.captainContainer}>
              <SoccerCard type={'red'} marginRight={4} />
              <Text style={styles.label}>
                : <Text style={styles.value}>{redCards}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>
              Goals Scored: <Text style={styles.value}>{goals}</Text>
            </Text>
            <Text style={styles.label}>
              Assists: <Text style={styles.value}>{assists}</Text>
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>
              Creativity:{' '}
              <Text style={styles.value}>{`${creativity.toFixed(2)}%`}</Text>
            </Text>
            <Text style={styles.label}>
              Influence:{' '}
              <Text style={styles.value}>{`${influence.toFixed(2)}%`}</Text>
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>
              Threat:{' '}
              <Text style={styles.value}>{`${threat.toFixed(2)}%`}</Text>
            </Text>
            <Text style={styles.label}>
              Dream Team Players:{' '}
              <Text style={styles.value}>{dreamTeamPlayers}</Text>
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TeamInfoModal;
