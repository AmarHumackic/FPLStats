import {View} from 'react-native';
import React from 'react';
import styles from './SoccerCard.styles';
import {colors} from '@constants/colors';

type Props = {
  type?: 'yellow' | 'red';
  size?: number;
  marginRight?: number;
};

const SoccerCard = ({type = 'yellow', size = 12, marginRight = 0}: Props) => (
  <View
    style={[
      styles.container,
      {
        backgroundColor:
          type === 'yellow' ? colors.yellowAlert : colors.redAlert,
        width: size,
        height: size * 1.5,
        marginRight,
      },
    ]}
  />
);

export default SoccerCard;
