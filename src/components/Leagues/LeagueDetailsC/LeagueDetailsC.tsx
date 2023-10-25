import {View, Text, FlatList} from 'react-native';
import React from 'react';
import styles from './LeagueDetailsC.styles';
import {ClassicLeagueDelegate, LeagueEntryDelegate} from 'src/types/api';
import Touchable from '@components/common/Touchable';
import {getRankIcon} from '@utils/getRankIcon';
import {InfiniteData} from '@tanstack/react-query';
import LoadingView from '@components/common/LoadingView';
import {colors} from '@constants/colors';
import {useSessionContext} from '@services/sessionContext';
import InformationIcon from '@assets/svgs/InformationIcon';

type Props = {
  data: InfiniteData<ClassicLeagueDelegate>;
  loadingNextPage: boolean;
  onTeam: (teamId: number) => void;
  onInfo: (teamId: number, teamName: string, playerName: string) => void;
  onNextPage: () => void;
};

const INFO_ICON_SIZE = 20;

const LeagueDetailsC = ({
  data,
  loadingNextPage,
  onTeam,
  onInfo,
  onNextPage,
}: Props) => {
  const {teamId} = useSessionContext();

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

      <View style={{width: INFO_ICON_SIZE + 5}} />
    </View>
  );

  const _renderItem = ({item}: {item: LeagueEntryDelegate}) => (
    <Touchable
      key={item.id}
      style={[
        styles.itemContainer,
        item.entry === teamId && styles.itemContainerSession,
      ]}
      onPress={() => onTeam(item.entry)}>
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

      <InformationIcon
        size={INFO_ICON_SIZE}
        onPress={() => onInfo(item.entry, item.entry_name, item.player_name)}
      />
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
