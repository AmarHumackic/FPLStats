import {colors} from '@constants/';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const AlertOctagonIcon = ({
  width = 24,
  height = 24,
  color = colors.accentDark,
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
    <Path d="M13 13H11V7H13M11 15H13V17H11M15.73 3H8.27L3 8.27V15.73L8.27 21H15.73L21 15.73V8.27L15.73 3Z" />
  </Svg>
);

export default AlertOctagonIcon;
