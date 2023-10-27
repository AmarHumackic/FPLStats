import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './DateFixturesView.styles';
import {DateFixture} from 'src/types/api';
import {getTeamLogo} from '@utils/getTeamLogo';
import dayjs from 'dayjs';

type Props = {
  title: string;
  fixtures: DateFixture[];
};

const DateFixturesView = ({title, fixtures}: Props) => (
  <View style={styles.container}>
    <View style={styles.dateContainer}>
      <Text style={styles.date}>
        {dayjs(title).format('dddd, D MMMM YYYY')}
      </Text>
    </View>

    {fixtures.map(f => (
      <View key={f.id} style={styles.itemContainer}>
        <View style={styles.itemLeftContainer}>
          <Text style={styles.teamName}>{f.team_h_name}</Text>
          <Image source={getTeamLogo(f.team_h_code)} style={styles.logoImg} />
        </View>
        <Text style={styles.time}>{dayjs(f.kickoff_time).format('HH:mm')}</Text>
        <View style={styles.itemRightContainer}>
          <Image source={getTeamLogo(f.team_a_code)} style={styles.logoImg} />
          <Text style={styles.teamName}>{f.team_a_name}</Text>
        </View>
      </View>
    ))}
  </View>
);

export default DateFixturesView;
