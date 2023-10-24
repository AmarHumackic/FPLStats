import Touchable from '@components/common/Touchable';
import {colors} from '@constants/';
import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  backgroundColor?: string;
  color?: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const InformationIcon = ({
  width = 20,
  height = 20,
  backgroundColor = colors.primary,
  color = colors.textDark2,
  onPress,
}: Props) => (
  <Touchable
    style={[
      styles.container,
      {
        width: width + 5,
        height: height + 5,
        backgroundColor,
        borderRadius: (width + 5) / 2,
      },
    ]}
    hitSlop={{top: 5, right: 5, bottom: 5, left: 5}}
    disabled={!onPress}
    onPress={() => (onPress ? onPress() : {})}>
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
      <Path d="M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z" />
    </Svg>
  </Touchable>
);

export default InformationIcon;
