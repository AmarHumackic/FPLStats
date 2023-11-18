import {View} from 'react-native';
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
        labels={['Current', 'Past', 'Chips']}
        textColor={colors.accentLight}
        bgColor={colors.accentDark}
        activeTextColor={colors.purePrimary}
        activeBgColor={colors.accentDark}
      />
      {activeTab === 1 && <HistoryList data={history?.current || []} />}
    </View>
  );
};

export default History;
