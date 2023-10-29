import {colors} from '@constants/';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  rotation: 'up' | 'down';
  width?: number;
  height?: number;
  color?: string;
  arrowColor?: string;
}

const ChevronIcon = ({
  rotation,
  width = 18,
  height = 18,
  color = rotation === 'up' ? colors.greenAlert : colors.redAlertLight,
}: Props) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    transform={rotation === 'down' ? [{rotateZ: '180deg'}] : []}>
    <Path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
  </Svg>
);

export default ChevronIcon;
