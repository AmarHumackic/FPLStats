import {View, Text, DimensionValue} from 'react-native';
import React from 'react';
import styles from './Captain.styles';

type Props = {
  type?: 'C' | 'V';
  marginRight?: DimensionValue;
};

const Captain = ({type = 'C', marginRight}: Props) => (
  <View style={[styles.container, {marginRight}]}>
    <Text style={styles.text}>{type}</Text>
  </View>
);

export default Captain;
