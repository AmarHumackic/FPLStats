import {colors} from '@constants/';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const SwapHorizontalIcon = ({
  width = 24,
  height = 24,
  color = colors.accentDark1,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
    <Path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" />
  </Svg>
);

export default SwapHorizontalIcon;
