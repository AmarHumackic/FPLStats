import {colors} from '@constants/';
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ColorValue,
  DimensionValue,
} from 'react-native';
import styles from './LoadingView.styles';

interface Props {
  title?: string;
  description?: string;
  position?: 'relative' | 'absolute';
  withoutTitle?: boolean;
  absoluteBackground?: string;
  indicatorColor?: ColorValue | undefined;
  size?: 'small' | 'large';
  paddingBottom?: DimensionValue;
}

const LoadingView = ({
  title = 'Loading...',
  description,
  position = 'absolute',
  withoutTitle = false,
  absoluteBackground,
  indicatorColor,
  size,
  paddingBottom = 0,
}: Props) => (
  <View
    style={
      position === 'absolute'
        ? [
            styles.containerAbsolute,
            absoluteBackground ? {backgroundColor: absoluteBackground} : {},
            {paddingBottom},
          ]
        : [styles.containerRelative, {paddingBottom}]
    }>
    {withoutTitle ? (
      <ActivityIndicator
        size={size || 'large'}
        color={indicatorColor || colors.accentDark}
      />
    ) : (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.loadingDescriptionContainer}>
          <ActivityIndicator
            size={size || 'large'}
            color={indicatorColor || colors.accentDark}
          />
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
    )}
  </View>
);

export default LoadingView;
