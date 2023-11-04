import React, {useMemo, useState} from 'react';
import styles from './Leagues.styles';
import {useQuery} from '@tanstack/react-query';
import {fetchManager} from '@services/api';
import {useSessionContext} from '@services/sessionContext';
import LoadingView from '@components/common/LoadingView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {filterLeagues} from '@utils/filterLeagues';
import TabsView from '@components/common/TabsView';
import LeagueTypeView from '@components/Leagues/LeagueTypeView';
import {RefreshControl, ScrollView} from 'react-native';
import {colors} from '@constants/colors';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps} from 'src/types/navigation';

type Props = StackScreenProps<LeaguesStackProps, 'Leagues'>;

const Leagues = ({navigation}: Props) => {
  const {teamId} = useSessionContext();
  const [activeTab, setActiveTab] = useState<number>(1);

  const {
    data: manager,
    isFetching: managerFetching,
    refetch,
    isRefetching,
  } = useQuery(['managerInfo', teamId], () => fetchManager(teamId), {
    cacheTime: Infinity,
  });

  const onLeagueDetails = (
    leagueId: number,
    leagueName: string,
    type: 'classic' | 'h2h',
  ) => navigation.navigate('LeagueDetails', {leagueId, leagueName, type});

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
        showsVerticalScrollIndicator={false}
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
        <LeagueTypeView
          title="Invitational Classic"
          data={invClassicL}
          onPress={(leagueId, leagueName) =>
            onLeagueDetails(leagueId, leagueName, 'classic')
          }
        />
        <LeagueTypeView
          title="Invitational Head-to-Head"
          data={invHeadL}
          onPress={(leagueId, leagueName) =>
            onLeagueDetails(leagueId, leagueName, 'h2h')
          }
        />
        <LeagueTypeView
          title="Public Classic"
          data={publicClassicL}
          onPress={(leagueId, leagueName) =>
            onLeagueDetails(leagueId, leagueName, 'classic')
          }
        />
        <LeagueTypeView
          title="Public Head-to-Head"
          data={publicHeadL}
          onPress={(leagueId, leagueName) =>
            onLeagueDetails(leagueId, leagueName, 'h2h')
          }
        />
        <LeagueTypeView
          title="General"
          data={generalL}
          onPress={(leagueId, leagueName) =>
            onLeagueDetails(leagueId, leagueName, 'classic')
          }
        />
        <LeagueTypeView
          title="Broadcaster"
          data={broadcasterL}
          onPress={(leagueId, leagueName) =>
            onLeagueDetails(leagueId, leagueName, 'classic')
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Leagues;
