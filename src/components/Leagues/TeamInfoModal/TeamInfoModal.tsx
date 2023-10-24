import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import styles from './TeamInfoModal.styles';
import {useQuery} from '@tanstack/react-query';
import {
  fetchBootstrapStatic,
  fetchEventLive,
  fetchManagerEventPicks,
} from '@services/api';

type Props = {
  teamId: number | undefined;
  onClose: () => void;
};

const TeamInfoModal = ({teamId, onClose}: Props) => {
  const [currentEventId, setCurrentEventId] = useState(0);

  useQuery(['bootstrapStatic'], fetchBootstrapStatic, {
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

  return (
    <View>
      <Modal
        isVisible={teamId ? true : false}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerLabel}>Select your team</Text>
        </View>
      </Modal>
    </View>
  );
};

export default TeamInfoModal;
