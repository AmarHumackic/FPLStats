import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Touchable from '../Touchable/Touchable';
import styles from './Button.styles';
import {colors} from '@constants/';

const PRESSED_OPACITY_IOS = 0.6;

interface Props {
  testID?: string;
  backgroundColor?: string;
  backgroundColorDisabled?: string;
  textColor?: string;
  title: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  textSize?: number;
  width?: DimensionValue;
  height?: DimensionValue;
  icon?: React.ReactNode;
  loading?: boolean;
  onPress: () => void;
  marginTop?: number;
}

const Button = ({
  testID,
  backgroundColor,
  backgroundColorDisabled,
  textColor,
  title,
  containerStyle = {},
  disabled = false,
  textSize,
  width,
  height,
  icon,
  loading,
  onPress,
  marginTop,
}: Props) => (
  <View
    style={[
      styles.containerParent,
      containerStyle,
      backgroundColor ? {backgroundColor} : {},
      backgroundColorDisabled && disabled
        ? {backgroundColor: backgroundColorDisabled}
        : {},
      disabled ? {opacity: PRESSED_OPACITY_IOS} : {},
      width ? {width} : {},
      height ? {height} : {},
      marginTop ? {marginTop} : {},
    ]}>
    <Touchable
      testID={testID}
      style={icon ? styles.rowContainer : styles.container}
      disabled={disabled}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={textColor || colors.primary} />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.title,
              textColor ? {color: textColor} : {},
              textSize ? {fontSize: textSize} : {},
            ]}>
            {title}
          </Text>
        </>
      )}
    </Touchable>
  </View>
);

export default Button;
