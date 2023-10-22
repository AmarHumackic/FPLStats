import React, {useMemo, useState} from 'react';
import styles from './Leagues.styles';
import {useQuery} from '@tanstack/react-query';
import {fetchManager} from '@services/api';
import {useSessionContext} from '@services/sessionContext';
import LoadingView from '@components/common/LoadingView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {filterLeagues} from '@utils/filterLeagues';
import TabsView from '@components/Leagues/TabsView';
import LeagueTypeView from '@components/Leagues/LeagueTypeView';
import {RefreshControl, ScrollView} from 'react-native';
import {colors} from '@constants/colors';

type Props = {};

const Leagues = ({}: Props) => {
  const {teamId} = useSessionContext();
  const [activeTab, setActiveTab] = useState<1 | 2>(1);

  const {
    data: manager,
    isFetching: managerFetching,
    refetch,
    isRefetching,
  } = useQuery(['managerInfo', teamId], () => fetchManager(teamId), {
    cacheTime: Infinity,
  });

  const {
    invClassicL,
    invHeadL,
    publicClassicL,
    publicHeadL,
    generalL,
    broadcasterL,
  } = useMemo(() => filterLeagues(manager?.leagues), [manager?.leagues]);

  if (managerFetching && !isRefetching) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TabsView activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            title="Pull to refresh"
            titleColor={colors.text}
            colors={[colors.text]}
            tintColor={colors.text}
          />
        }>
        <LeagueTypeView title="Invitational Classic" data={invClassicL} />
        <LeagueTypeView title="Invitational Head-to-Head" data={invHeadL} />
        <LeagueTypeView title="Public Classic" data={publicClassicL} />
        <LeagueTypeView title="Public Head-to-Head" data={publicHeadL} />
        <LeagueTypeView title="General" data={generalL} />
        <LeagueTypeView title="Broadcaster" data={broadcasterL} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Leagues;
