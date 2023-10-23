import {View, Text, FlatList} from 'react-native';
import React from 'react';
import styles from './LeagueDetailsC.styles';
import {ClassicLeagueDelegate, LeagueEntryDelegate} from 'src/types/api';
import Touchable from '@components/common/Touchable';
import {getRankIcon} from '@utils/getRankIcon';
import {InfiniteData} from '@tanstack/react-query';
import LoadingView from '@components/common/LoadingView';
import {colors} from '@constants/colors';

type Props = {
  data: InfiniteData<ClassicLeagueDelegate>;
  loadingNextPage: boolean;
  onPress: (teamId: number) => void;
  onNextPage: () => void;
};

const LeagueDetailsC = ({
  data,
  loadingNextPage,
  onPress,
  onNextPage,
}: Props) => {
  const _renderHeader = () => (
    <View style={[styles.itemContainer, styles.headerContainer]}>
      <View style={styles.rankContainer}>
        <Text style={[styles.rank, styles.headerText]}>Rank</Text>
      </View>

      <View style={styles.teamContainer}>
        <Text style={[styles.teamName, styles.headerText]}>Team</Text>
      </View>

      <Text style={[styles.gwPoints, styles.headerText]}>GW</Text>
      <Text style={[styles.totalPoints, styles.headerText]}>Total</Text>
    </View>
  );

  const _renderItem = ({item}: {item: LeagueEntryDelegate}) => (
    <Touchable
      key={item.id}
      style={styles.itemContainer}
      onPress={() => onPress(item.id)}>
      <View style={styles.rankContainer}>
        <Text style={styles.rank} adjustsFontSizeToFit numberOfLines={1}>
          {item.rank}
        </Text>
        {getRankIcon(item?.rank, item?.last_rank)}
      </View>

      <View style={styles.teamContainer}>
        <Text style={styles.teamName}>{item.entry_name}</Text>
        <Text style={styles.playerName}>{item.player_name}</Text>
      </View>

      <Text style={styles.gwPoints}>{item.event_total}</Text>
      <Text style={styles.totalPoints}>{item.total}</Text>
    </Touchable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.pages.map(page => page.standings.results).flat()}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={50}
        showsVerticalScrollIndicator={false}
        renderItem={_renderItem}
        onEndReached={onNextPage}
        ListHeaderComponent={_renderHeader}
        stickyHeaderIndices={[0]}
        ListFooterComponent={
          loadingNextPage ? (
            <LoadingView
              position="relative"
              withoutTitle
              indicatorColor={colors.textDark2}
              size="small"
              paddingBottom={24}
            />
          ) : undefined
        }
      />
    </View>
  );
};

export default LeagueDetailsC;
