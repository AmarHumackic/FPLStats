import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './DateFixturesView.styles';
import {DateFixture} from 'src/types/api';
import {getTeamLogo} from '@utils/getTeamLogo';
import dayjs from 'dayjs';
import Touchable from '@components/common/Touchable';

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
      <Touchable
        key={f.id}
        style={styles.itemContainer}
        onPress={() => onPress(title, index)}>
        <View style={styles.itemLeftContainer}>
          <Text style={[styles.teamName, styles.textRight]}>
            {f.team_h_name}
          </Text>
          <Image source={getTeamLogo(f.team_h_code)} style={styles.logoImg} />
        </View>
        {f.started ? (
          <Text
            style={[
              styles.scores,
              f.finished_provisional && styles.scoresFinished,
            ]}>{`${f.team_h_score} - ${f.team_a_score}`}</Text>
        ) : (
          <Text style={styles.time}>
            {dayjs(f.kickoff_time).format('HH:mm')}
          </Text>
        )}
        <View style={styles.itemRightContainer}>
          <Image source={getTeamLogo(f.team_a_code)} style={styles.logoImg} />
          <Text style={[styles.teamName, styles.textLeft]}>
            {f.team_a_name}
          </Text>
        </View>
      </Touchable>
    ))}
  </View>
);

export default DateFixturesView;
