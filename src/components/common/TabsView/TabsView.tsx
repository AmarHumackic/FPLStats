import {View, Text} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import styles from './TabsView.styles';
import Touchable from '@components/common/Touchable';

type Props = {
  activeTab: 1 | 2;
  setActiveTab: Dispatch<SetStateAction<1 | 2>>;
  labels?: string[];
  bgColor?: string;
  textColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
};

const TabsView = ({
  activeTab,
  setActiveTab,
  labels,
  bgColor,
  textColor,
  activeBgColor,
  activeTextColor,
}: Props) => {
  const renderTab = (
    title: string,
    tabIndex: typeof activeTab,
    isActive = activeTab === tabIndex,
  ) => (
    <Touchable
      style={[
        styles.tabContainer,
        isActive && styles.activeTabContainer,
        bgColor ? {backgroundColor: bgColor} : {},
        activeBgColor && isActive ? {backgroundColor: activeBgColor} : {},
      ]}
      onPress={() => setActiveTab(tabIndex)}>
      <Text
        style={[
          styles.tabText,
          isActive && styles.activeTabText,
          textColor ? {color: textColor} : {},
          activeBgColor && isActive ? {color: activeTextColor} : {},
        ]}>
        {title}
      </Text>
    </Touchable>
  );

  return (
    <View style={styles.container}>
      {labels?.map((l, index) => renderTab(l, (index + 1) as typeof activeTab))}
    </View>
  );
};

export default TabsView;
