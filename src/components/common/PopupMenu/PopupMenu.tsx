import React, {useEffect, useRef, useState} from 'react';
import styles from './PopupMenu.styles';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  UIManager,
  findNodeHandle,
  TouchableWithoutFeedback,
} from 'react-native';
import Touchable from '../Touchable';
import {isAndroid} from '@utils/isAndroid';
import {PopupMenuModel} from 'src/types/common';
import DotsVerticalIcon from '@assets/svgs/DotsVerticalIcon';

interface Props {
  children?: JSX.Element;
  dropdownList: PopupMenuModel[];
  disabled?: boolean;
  fontSize?: 'large' | 'small';
}
const ChildrenDropdown = ({
  children,
  dropdownList,
  disabled = false,
  fontSize = 'large',
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef<TouchableWithoutFeedback>(null);

  const onSelectOption = (option: PopupMenuModel) => {
    option.onPress();
    setIsVisible(false);
  };

  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [opacity, isVisible]);

  const size = isVisible
    ? opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0],
      })
    : opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
      });

  const showPopupAndroid = () =>
    UIManager.showPopupMenu(
      findNodeHandle(iconRef.current) || 0,
      dropdownList.map(listItem => listItem.label),
      () => {}, // error
      (_, index: number | undefined) => {
        (index || index === 0) && dropdownList[index].onPress();
      },
    );

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback ref={iconRef}>
        <Touchable
          disabled={disabled}
          onPress={() =>
            isAndroid() ? showPopupAndroid() : setIsVisible(!isVisible)
          }>
          {children ? (
            children
          ) : (
            <View style={styles.childrenContainer}>
              <DotsVerticalIcon />
            </View>
          )}
        </Touchable>
      </TouchableWithoutFeedback>

      {isVisible && !isAndroid() && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownHeader}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.closeView}
              onPress={() => setIsVisible(false)}
            />
            <Animated.View
              style={[
                styles.dropdownListContainer,
                {
                  transform: [{translateX: size}],
                },
              ]}>
              {dropdownList.map((el, index) => (
                <Touchable key={index} onPress={() => onSelectOption(el)}>
                  <View
                    style={
                      fontSize === 'large'
                        ? styles.dropdownListItem
                        : styles.dropdownListItemSmall
                    }>
                    <View style={styles.dropdownListIcon}>{el.icon}</View>
                    <Text
                      style={
                        fontSize === 'large'
                          ? styles.dropdownItemLabel
                          : styles.dropdownItemLabelSmall
                      }
                      numberOfLines={1}>
                      {el.label}
                    </Text>
                  </View>
                </Touchable>
              ))}
            </Animated.View>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            style={styles.closeView}
            onPress={() => setIsVisible(false)}
          />
        </View>
      )}
    </View>
  );
};

export default ChildrenDropdown;
