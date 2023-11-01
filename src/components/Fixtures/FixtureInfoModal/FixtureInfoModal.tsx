import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './FixtureInfoModal.styles';
import Modal from 'react-native-modal';
import {CustomAwayHomeStatType, DateFixture} from 'src/types/api';
import FixtureView from '../DateFixturesView/FixtureView';
import TabsView from '@components/common/TabsView';
import {colors} from '@constants/colors';
import {identifiersLabel} from '@utils/createStrEnum';
import SectionLabel from '@components/common/SectionLabel';
import Touchable from '@components/common/Touchable';
import PlayerStatsTable from './PlayerStatsTable';

type Props = {
  fixture: DateFixture | undefined;
  onClose: () => void;
};

const FixtureInfoModal = ({fixture, onClose}: Props) => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);

  const renderElement = (element: CustomAwayHomeStatType) => (
    <Touchable
      key={element.element}
      style={styles.elementContainer}
      onPress={() => {}}>
      <Text style={styles.elementName}>{element.web_name}</Text>
      <Text style={styles.elementValue}>{` (${element.value})`}</Text>
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContentContainer}>
              {fixture.match_details
                .filter(md => md.identifier && (md.h.length || md.a.length))
                .map(md => (
                  <View key={md?.identifier}>
                    <SectionLabel
                      label={identifiersLabel[md?.identifier!] || ''}
                      alignCenter
                      width={'95%'}
                    />
                    <View style={styles.identifierContainer}>
                      <View style={styles.hContainer}>
                        {md.h.map(el => renderElement(el))}
                      </View>
                      <View style={styles.separator} />
                      <View style={styles.aContainer}>
                        {md.a.map(el => renderElement(el))}
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          )}

          {activeTab === 2 && <PlayerStatsTable fixtureId={fixture.id} />}
        </View>
      </Modal>
    </View>
  );
};

export default FixtureInfoModal;
