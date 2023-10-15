import {colors} from '@constants/';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const PollIcon = ({
  width = 24,
  height = 24,
  color = colors.accentDark,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
    <Path d="M3,22V8H7V22H3M10,22V2H14V22H10M17,22V14H21V22H17Z" />
  </Svg>
);

export default PollIcon;
