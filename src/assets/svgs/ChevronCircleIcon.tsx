import {colors} from '@constants/';
import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

interface Props {
  rotation: 'up' | 'down';
  width?: number;
  height?: number;
  color?: string;
  arrowColor?: string;
}

const ChevronCircleIcon = ({
  rotation,
  width = 18,
  height = 18,
  color = colors.greenAlert,
  arrowColor = colors.textDark2,
}: Props) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={color}
    transform={rotation === 'down' ? [{rotateZ: '180deg'}] : []}>
    <G fillRule="evenodd">
      <Path d="M8,16 C8.85354691,16 9.67587305,15.866328 10.4471863,15.618776 C13.6684789,14.5849062 16,11.5647311 16,8 C16,3.581722 12.418278,0 8,0 C3.581722,0 0,3.581722 0,8 C0,12.418278 3.581722,16 8,16 Z" />
      <Path
        fill={arrowColor}
        fillRule="nonzero"
        d="M4.5,6.27851588 L5.1004646,5.63925794 C5.43077928,5.2876031 5.70475818,5 5.70967916,5 C5.71460014,5 6.23194007,5.54639596 6.85921456,6.2144865 L8,7.428973 L9.14078544,6.2144865 C9.76831893,5.5467015 10.2856309,5 10.2903208,5 C10.2952427,5 10.5695007,5.28761055 10.8995354,5.63925794 L11.5,6.27851588 L9.75217699,8.13925794 C8.79080084,9.16274432 8.00246399,10 8.000014,10 C7.99756401,10 7.20894716,9.16281884 6.24785101,8.13925794 L4.5,6.27851588 Z"
        transform="matrix(1 0 0 -1 0 15)"
      />
    </G>
  </Svg>
);

export default ChevronCircleIcon;
