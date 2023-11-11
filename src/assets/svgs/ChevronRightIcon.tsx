import {colors} from '@constants/';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const ChevronRightIcon = ({
  width = 24,
  height = 24,
  color = colors.purePrimary,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
    <Path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </Svg>
);

export default ChevronRightIcon;
