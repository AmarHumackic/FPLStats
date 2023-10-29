import {View, Text} from 'react-native';
import React from 'react';
import styles from './FixtureInfoModal.styles';
import Modal from 'react-native-modal';
import {DateFixture} from 'src/types/api';

type Props = {
  fixture: DateFixture | undefined;
  onClose: () => void;
};

const FixtureInfoModal = ({fixture, onClose}: Props) => {
  return (
    <View>
      <Modal
        isVisible={fixture?.id ? true : false}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerTitle}>
            {`${fixture?.team_h_name} - ${fixture?.team_a_name}`}
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default FixtureInfoModal;
