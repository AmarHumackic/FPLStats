import {View, Text} from 'react-native';
import React from 'react';
import styles from './SectionLabel.styles';

type Props = {
  label: string;
  fullWidth?: boolean;
  alignCenter?: boolean;
};

const SectionLabel = ({label, fullWidth, alignCenter}: Props) => (
  <View
    style={[
      styles.titleContainer,
      fullWidth && styles.fullWidthContainer,
      alignCenter && styles.alignCenterContainer,
    ]}>
    <Text style={styles.title}>{label}</Text>
  </View>
);

export default SectionLabel;
