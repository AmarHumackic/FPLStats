import {View, Text} from 'react-native';
import React from 'react';
import styles from './DateFixturesView.styles';
import {DateFixture} from 'src/types/api';
import dayjs from 'dayjs';
import FixtureView from './FixtureView';

type Props = {
  title: string;
  fixtures: DateFixture[];
  onPress: (df: string, index: number) => void;
};

const DateFixturesView = ({title, fixtures, onPress}: Props) => (
  <View style={styles.container}>
    <View style={styles.dateContainer}>
      <Text style={styles.date}>
        {dayjs(title).format('dddd, D MMMM YYYY')}
      </Text>
    </View>

    {fixtures.map((f, index) => (
      <FixtureView
        key={f.id}
        fixture={f}
        onPress={() => onPress(title, index)}
      />
    ))}
  </View>
);

export default DateFixturesView;
