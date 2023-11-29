import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {SearchByNameResult} from 'src/types/auth';
import styles from './NameResultsModal.styles';
import Touchable from '@components/common/Touchable';
import Button from '@components/common/Button';
import {colors} from '@constants/colors';
import {sizes} from '@constants/sizes';

type Props = {
  nameResults: SearchByNameResult[];
  onSelect: (teamId: SearchByNameResult['EntryId']) => void;
  onClose: () => void;
};

const NameResultsModal = ({nameResults, onSelect, onClose}: Props) => {
  const [selectedTeamId, setSelectedTeamId] =
    useState<SearchByNameResult['EntryId']>();

  const closeHandler = () => {
    setSelectedTeamId(undefined);
    onClose();
  };

  const selectHandler = () => {
    if (selectedTeamId) {
      onSelect(selectedTeamId);
      closeHandler();
    }
  };

  return (
    <View>
      <Modal
        testID="authNameResultsModal"
        isVisible={nameResults.length ? true : false}
        onBackButtonPress={closeHandler}
        onBackdropPress={closeHandler}>
        <View style={styles.contentContainer}>
          <FlatList
            ListHeaderComponent={
              <Text style={styles.headerLabel}>Select your team</Text>
            }
            keyExtractor={item => item.EntryId.toString()}
            data={nameResults}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Touchable
                style={[
                  styles.itemContainer,
                  item.EntryId === selectedTeamId
                    ? styles.itemContainerSelected
                    : {},
                ]}
                onPress={() => setSelectedTeamId(item.EntryId)}>
                <Text style={styles.itemLabel}>
                  {item.Name + ' - ' + item.PlayerName}{' '}
                </Text>
              </Touchable>
            )}
          />

          <Button
            title="Submit"
            onPress={selectHandler}
            backgroundColor={colors.accentDark}
            textColor={colors.primary}
            textSize={sizes.ml}
            width={'100%'}
            height={40}
            marginTop={16}
            disabled={!selectedTeamId}
          />
        </View>
      </Modal>
    </View>
  );
};

export default NameResultsModal;
