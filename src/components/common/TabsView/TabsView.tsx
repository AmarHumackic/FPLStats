import {View, Text, ViewStyle} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import styles from './TabsView.styles';
import Touchable from '@components/common/Touchable';

type Props = {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  labels?: string[];
  bgColor?: string;
  textColor?: string;
  textSize?: number;
  activeBgColor?: string;
  activeTextColor?: string;
  containerStyle?: ViewStyle;
  itemContainerStyle?: ViewStyle;
};

const TabsView = ({
  activeTab,
  setActiveTab,
  labels,
  bgColor,
  textColor,
  textSize,
  activeBgColor,
  activeTextColor,
  containerStyle = {},
  itemContainerStyle = {},
}: Props) => {
  const renderTab = (
    title: string,
    tabIndex: typeof activeTab,
    isActive = activeTab === tabIndex,
  ) => (
    <Touchable
      key={tabIndex}
      style={[
        styles.tabContainer,
        itemContainerStyle,
        isActive && styles.activeTabContainer,
        bgColor ? {backgroundColor: bgColor} : {},
        activeBgColor && isActive ? {backgroundColor: activeBgColor} : {},
      ]}
      onPress={() => setActiveTab(tabIndex)}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          styles.tabText,
          isActive && styles.activeTabText,
          textColor ? {color: textColor} : {},
          textSize ? {fontSize: textSize} : {},
          activeBgColor && isActive ? {color: activeTextColor} : {},
        ]}>
        {title}
      </Text>
    </Touchable>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {labels?.map((l, index) => renderTab(l, (index + 1) as typeof activeTab))}
    </View>
  );
};

export default TabsView;
