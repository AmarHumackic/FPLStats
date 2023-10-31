import {View, Text, DimensionValue} from 'react-native';
import React from 'react';
import styles from './SectionLabel.styles';

type Props = {
  label: string;
  width?: DimensionValue;
  alignCenter?: boolean;
  marginBottom?: DimensionValue;
};

const SectionLabel = ({label, width, alignCenter, marginBottom = 0}: Props) => (
  <View
    style={[
      styles.titleContainer,
      alignCenter && styles.alignCenterContainer,
      width ? {width} : {},
      {marginBottom},
    ]}>
    <Text style={styles.title}>{label}</Text>
  </View>
);

export default SectionLabel;
