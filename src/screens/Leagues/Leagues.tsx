import React, {useMemo, useState} from 'react';
import styles from './Leagues.styles';
import {useQuery} from '@tanstack/react-query';
import {fetchManager} from '@services/api';
import {useSessionContext} from '@services/sessionContext';
import LoadingView from '@components/common/LoadingView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {filterLeagues} from '@utils/filterLeagues';
import TabsView from '@components/common/TabsView';
import LeagueCupView from '@components/Leagues/LeagueCupView';
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
  } = useMemo(
    () => filterLeagues(manager?.leagues, teamId),
    [manager?.leagues, teamId],
  );

  if (managerFetching && !isRefetching) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TabsView
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        labels={['Leagues', 'Cups']}
        textColor={colors.accentLight}
        bgColor={colors.accentDark}
        activeTextColor={colors.purePrimary}
        activeBgColor={colors.accentDark}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            title="Pull to refresh"
            titleColor={colors.accentDark}
            colors={[colors.accentDark]}
            tintColor={colors.accentDark}
          />
        }>
        <LeagueCupView
          isLeagueView={activeTab === 1}
          title={activeTab === 1 ? 'Invitational Classic' : 'League Cups'}
          data={invClassicL}
          onPress={(leagueId, leagueName) =>
            onLeagueDetails(leagueId, leagueName, 'classic')
          }
        />
        {activeTab === 1 && (
          <LeagueCupView
            title="Invitational Head-to-Head"
            data={invHeadL}
            onPress={(leagueId, leagueName) =>
              onLeagueDetails(leagueId, leagueName, 'h2h')
            }
          />
        )}
        {activeTab === 1 && (
          <LeagueCupView
            title="Public Classic"
            data={publicClassicL}
            onPress={(leagueId, leagueName) =>
              onLeagueDetails(leagueId, leagueName, 'classic')
            }
          />
        )}
        {activeTab === 1 && (
          <LeagueCupView
            title="Public Head-to-Head"
            data={publicHeadL}
            onPress={(leagueId, leagueName) =>
              onLeagueDetails(leagueId, leagueName, 'h2h')
            }
          />
        )}
        <LeagueCupView
          isLeagueView={activeTab === 1}
          title={`General${activeTab === 2 ? ' Cups' : ''}`}
          data={generalL}
          onPress={(leagueId, leagueName) =>
            onLeagueDetails(leagueId, leagueName, 'classic')
          }
        />
        <LeagueCupView
          isLeagueView={activeTab === 1}
          title={`Broadcaster${activeTab === 2 ? ' Cups' : ''}`}
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
