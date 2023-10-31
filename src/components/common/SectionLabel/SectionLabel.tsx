import {View, Text, DimensionValue} from 'react-native';
import React from 'react';
import styles from './SectionLabel.styles';

type Props = {
  label: string;
  fullWidth?: boolean;
  alignCenter?: boolean;
  marginBottom?: DimensionValue;
};

const SectionLabel = ({
  label,
  fullWidth,
  alignCenter,
  marginBottom = 0,
}: Props) => (
  <View
    style={[
      styles.titleContainer,
      fullWidth && styles.fullWidthContainer,
      alignCenter && styles.alignCenterContainer,
      {marginBottom},
    ]}>
    <Text style={styles.title}>{label}</Text>
  </View>
);

export default SectionLabel;
