import {colors} from '@constants';
import React from 'react';
import {View, Text, ActivityIndicator, ColorValue} from 'react-native';
import styles from './LoadingView.styles';

interface Props {
  title?: string;
  description?: string;
  position?: 'relative' | 'absolute';
  withoutTitle?: boolean;
  absoluteBackground?: string;
  indicatorColor?: ColorValue | undefined;
}

const LoadingView = ({
  title = 'Loading...',
  description,
  position = 'absolute',
  withoutTitle = false,
  absoluteBackground,
  indicatorColor,
}: Props) => (
  <View
    style={
      position === 'absolute'
        ? [
            styles.containerAbsolute,
            absoluteBackground ? {backgroundColor: absoluteBackground} : {},
          ]
        : styles.containerRelative
    }>
    {withoutTitle ? (
      <ActivityIndicator
        size={'large'}
        color={indicatorColor || colors.primary}
      />
    ) : (
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.loadingDescriptionContainer}>
          <ActivityIndicator
            size={'large'}
            color={indicatorColor || colors.accentDark}
          />
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
    )}
  </View>
);

export default LoadingView;
