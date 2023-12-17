import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
import styles from './LeagueCupView.styles';
import {CustomLeagueCup} from 'src/types/api';
import Touchable from '@components/common/Touchable';
import {getRankIcon} from '@utils/getRankIcon';
import SectionLabel from '@components/common/SectionLabel';
import {colors} from '@constants/colors';

type Props = {
  isLeagueView?: boolean;
  title: string;
  data: CustomLeagueCup[];
  onPress: (leagueId: number, leagueName: string) => void;
};

const LeagueCupView = ({isLeagueView = true, title, data, onPress}: Props) => {
  const isNotLast = (index: number) => !(filteredData.length - 1 === index);

  const filteredData = useMemo(
    () => (isLeagueView ? data : data.filter(el => el.has_cup)),
    [data, isLeagueView],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SectionLabel label={title} marginBottom={5} />
        {isLeagueView && <Text style={styles.headerRank}>Rank</Text>}
      </View>
      {filteredData.map((league, index) => (
        <Touchable
          key={league.id}
          style={[
            styles.itemContainer,
            isNotLast(index) && styles.itemContainerSeparator,
          ]}
          onPress={() => onPress(league.id, league.name)}>
          <Text style={styles.name}>{`${league.name}${
            !isLeagueView ? ' Cup' : ''
          }`}</Text>
          {isLeagueView ? (
            <View style={styles.rankContainer}>
              {getRankIcon(league?.entry_rank, league?.entry_last_rank)}
              <Text style={styles.rank}>{league?.entry_rank || '-'}</Text>
            </View>
          ) : league.event ? (
            <View style={styles.cupMatchContainer}>
              <View
                style={[
                  styles.eventContainer,
                  {
                    backgroundColor: league.isWinning
                      ? colors.greenAlert
                      : league.isWinning === false
                      ? colors.redAlert
                      : undefined,
                  },
                ]}>
                <Text
                  style={[
                    styles.event,
                    league.isWinning === false
                      ? {color: colors.purePrimary}
                      : {},
                  ]}>{`GW${league?.event}`}</Text>
              </View>
              <Text
                style={
                  styles.eventPoints
                }>{` ${league?.entry_1_points} - ${league.entry_2_points}`}</Text>
            </View>
          ) : null}
        </Touchable>
      ))}
    </View>
  );
};

export default LeagueCupView;
