import {View, Text} from 'react-native';
import React from 'react';
import styles from './LeagueTypeView.styles';
import {H2HLeagueDetailsDelegate, UserDelegate} from 'src/types/api';
import Touchable from '@components/common/Touchable';
import {getRankIcon} from '@utils/getRankIcon';

type Props = {
  title: string;
  data: UserDelegate['leagues']['classic'] | H2HLeagueDetailsDelegate[];
  onPress: (leagueId: number, leagueName: string) => void;
};

const LeagueTypeView = ({title, data, onPress}: Props) => {
  const isNotLast = (index: number) => !(data.length - 1 === index);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.headerRank}>Rank</Text>
      </View>
      {data.map((league, index) => (
        <Touchable
          key={league.id}
          style={[
            styles.itemContainer,
            isNotLast(index) && styles.itemContainerSeparator,
          ]}
          onPress={() => onPress(league.id, league.name)}>
          <Text style={styles.name}>{league.name}</Text>
          <View style={styles.rankContainer}>
            {getRankIcon(league?.entry_rank, league?.entry_last_rank)}
            <Text style={styles.rank}>{league?.entry_rank || '-'}</Text>
          </View>
        </Touchable>
      ))}
    </View>
  );
};

export default LeagueTypeView;
