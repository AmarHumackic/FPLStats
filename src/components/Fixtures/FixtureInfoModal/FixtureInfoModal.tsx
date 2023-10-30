import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './FixtureInfoModal.styles';
import Modal from 'react-native-modal';
import {
  CustomAwayHomeStatType,
  DateFixture,
  DateFixtureStat,
} from 'src/types/api';
import FixtureView from '../DateFixturesView/FixtureView';
import TabsView from '@components/common/TabsView';
import {colors} from '@constants/colors';
import {identifiersLabel} from '@utils/createStrEnum';
import SectionLabel from '@components/common/SectionLabel';
import {isNullOrEmpty} from '@utils/isNullOrEmpty';
import Touchable from '@components/common/Touchable';

type Props = {
  fixture: DateFixture | undefined;
  onClose: () => void;
};

const FixtureInfoModal = ({fixture, onClose}: Props) => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);

  const renderElement = (element: CustomAwayHomeStatType) => (
    <Touchable
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={() => {}}>
      <Text>{element.web_name}</Text>
      <Text>{` (${element.value})`}</Text>
    </Touchable>
  );

  if (!fixture) {
    return null;
  }

  return (
    <View>
      <Modal
        isVisible={fixture?.id ? true : false}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>{`Gameweek ${fixture.event}`}</Text>
          <FixtureView fixture={fixture} />

          <TabsView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            labels={['Details', 'Player Stats']}
            bgColor={colors.accentDark}
            textColor={colors.accentLight}
            activeBgColor={colors.accentDark}
            activeTextColor={colors.primary}
          />

          {activeTab === 1 && (
            <ScrollView>
              {fixture.match_details
                .filter(md => md.identifier && (md.h.length || md.a.length))
                .map(md => (
                  <View key={md?.identifier}>
                    <SectionLabel
                      label={identifiersLabel[md?.identifier!] || ''}
                      fullWidth
                      alignCenter
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingBottom: 5,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                        }}>
                        {md.h.map(el => renderElement(el))}
                      </View>
                      <View
                        style={{
                          width: 1,
                          backgroundColor: colors.textLight1,
                          marginHorizontal: 5,
                        }}
                      />
                      <View style={{flex: 1}}>
                        {md.a.map(el => renderElement(el))}
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default FixtureInfoModal;
