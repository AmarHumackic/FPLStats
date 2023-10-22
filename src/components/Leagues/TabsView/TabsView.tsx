import {View, Text} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import styles from './TabsView.styles';
import Touchable from '@components/common/Touchable';

type Props = {
  activeTab: 1 | 2;
  setActiveTab: Dispatch<SetStateAction<1 | 2>>;
};

const TabsView = ({activeTab, setActiveTab}: Props) => {
  const renderTab = (title: string, tabIndex: typeof activeTab) => (
    <Touchable
      style={[
        styles.tabContainer,
        activeTab === tabIndex && styles.activeTabContainer,
      ]}
      onPress={() => setActiveTab(tabIndex)}>
      <Text
        style={[
          styles.tabText,
          activeTab === tabIndex && styles.activeTabText,
        ]}>
        {title}
      </Text>
    </Touchable>
  );

  return (
    <View style={styles.container}>
      {renderTab('Leagues', 1)}
      {renderTab('Cups', 2)}
    </View>
  );
};

export default TabsView;
