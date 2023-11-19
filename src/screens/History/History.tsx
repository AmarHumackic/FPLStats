import {ScrollView, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import styles from './History.styles';
import TabsView from '@components/common/TabsView';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps, TeamStackProps} from 'src/types/navigation';
import {colors} from '@constants/colors';
import {useQuery} from '@tanstack/react-query';
import {fetchManagerHistory} from '@services/api';
import LoadingView from '@components/common/LoadingView';
import HistoryList from '@components/History/HistoryList';
import dayjs from 'dayjs';
import {ChipTypes} from 'src/types/api';

type Props = StackScreenProps<TeamStackProps | LeaguesStackProps, 'History'>;

const History = ({navigation, route}: Props) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const {teamId, teamName} = route.params;

  const {data: history, isFetching: historyFetching} = useQuery(
    ['managerEventPicks', teamId],
    () => fetchManagerHistory(teamId),
    {staleTime: 20000},
  );

  useLayoutEffect(() =>
    navigation.setOptions({
      headerTitle: `History${teamName ? ` (${teamName})` : ''}`,
    }),
  );

  if (historyFetching) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <TabsView
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        labels={['Current', 'Chips', 'Past']}
        textColor={colors.accentLight}
        bgColor={colors.accentDark}
        activeTextColor={colors.purePrimary}
        activeBgColor={colors.accentDark}
      />
      {activeTab === 1 && (
        <HistoryList
          data={history?.current || []}
          chips={history?.chips || []}
        />
      )}
      {activeTab === 2 && (
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}>
          {history?.chips.map((c, index) => (
            <View key={index.toString()} style={styles.itemContainer}>
              <Text style={[styles.text, styles.textChip]}>
                {ChipTypes?.[c.name] || ''}
              </Text>
              <Text style={styles.text}>
                {dayjs(c.time).format('dddd, D MMMM YYYY, HH:mm')}
              </Text>
              <Text style={styles.text}>{`Gameweek ${c.event}`}</Text>
            </View>
          ))}
        </ScrollView>
      )}
      {activeTab === 3 && (
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}>
          {history?.past.map(p => (
            <View key={p.season_name} style={styles.itemContainer}>
              <Text style={styles.text}>
                Season: <Text style={styles.textBold}>{p.season_name}</Text>
              </Text>
              <Text style={styles.text}>
                Total points:{' '}
                <Text style={styles.textBold}>{p.total_points}</Text>
              </Text>
              <Text style={styles.text}>
                Rank: <Text style={styles.textBold}>{p.rank}</Text>
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default History;
