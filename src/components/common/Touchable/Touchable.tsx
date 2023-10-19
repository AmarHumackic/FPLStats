import {isAndroid} from '@utils/isAndroid';
import React, {ReactNode} from 'react';
import {ViewStyle, Pressable, View} from 'react-native';
import styles from './Touchable.styles';
import {colors} from '@constants/';

const PRESSED_OPACITY_IOS = 0.6;

interface Props {
  children: ReactNode;
  rippleColor?: string;
  style?: ViewStyle | {};
  hitSlop?: Object;
  disabled?: boolean;
  marginRight?: number;
  rippleInBorders?: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  props?: Object;
}

const CTouchable = ({
  children,
  rippleColor,
  style,
  hitSlop = {},
  disabled,
  marginRight,
  rippleInBorders = false,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  props,
}: Props) => (
  <>
    {!rippleInBorders ? (
      <Pressable
        {...props}
        android_ripple={{
          color: rippleColor || colors.defaultRipple,
          borderless: false,
        }}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={({pressed}) => [
          {opacity: !isAndroid() && pressed ? PRESSED_OPACITY_IOS : 1},
          style,
          marginRight ? {marginRight} : {},
          disabled ? {opacity: PRESSED_OPACITY_IOS} : {},
        ]}
        hitSlop={hitSlop}
        onLongPress={onLongPress}
        disabled={disabled}>
        {children}
      </Pressable>
    ) : (
      <View
        style={[
          styles.touchableParent,
          marginRight ? {marginRight} : {},
          disabled ? {opacity: PRESSED_OPACITY_IOS} : {},
        ]}>
        <Pressable
          {...props}
          android_ripple={{
            color: rippleColor || colors.defaultRipple,
            borderless: false,
          }}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={({pressed}) => [
            {opacity: !isAndroid() && pressed ? PRESSED_OPACITY_IOS : 1},
            style,
          ]}
          hitSlop={hitSlop}
          onLongPress={onLongPress}
          disabled={disabled}>
          {children}
        </Pressable>
      </View>
    )}
  </>
);

export default CTouchable;
