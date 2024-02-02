import {View, Text} from 'react-native';
import React from 'react';
import styles from './PlayerEventModal.styles';
import Modal from 'react-native-modal';
import {DreamTeamPlayer, TeamPlayerDelegate} from 'src/types/api';

type Props = {
  player: TeamPlayerDelegate | DreamTeamPlayer | null;
  onClose: () => void;
};

const PlayerEventModal = ({player, onClose}: Props) => {
  if (!player) {
    return null;
  }

  return (
    <View>
      <Modal
        isVisible={player?.id ? true : false}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>{player.web_name}</Text>
        </View>
      </Modal>
    </View>
  );
};

export default PlayerEventModal;
