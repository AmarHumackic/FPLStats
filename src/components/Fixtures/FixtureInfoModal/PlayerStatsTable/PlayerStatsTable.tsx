import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './PlayerStatsTable.styles';
import LoadingView from '@components/common/LoadingView';
import {
  Table,
  Row,
  TableWrapper,
  Cell,
  Col,
} from 'react-native-reanimated-table';
import {useQuery} from '@tanstack/react-query';
import {fetchBootstrapStatic, fetchFixtureStats} from '@services/api';
import {colors} from '@constants/colors';
import {ElementStatName} from 'src/types/api';
import {sizes} from '@constants/sizes';

const tableHeadLabels = [
  'Player',
  'Pts',
  'ST',
  'MP',
  'GS',
  'A',
  'xG',
  'xA',
  'xGI',
  'CS',
  'GC',
  'xGC',
  'OG',
  'PS',
  'PM',
  'YC',
  'RC',
  'S',
  'BP',
  'BPS',
  'I',
  'C',
  'T',
  'II',
];

const tableHeadValues: PlayerStatsHeadProps[] = [
  'web_name',
  'total_points',
  'starts',
  'minutes',
  'goals_scored',
  'assists',
  'expected_goals',
  'expected_assists',
  'expected_goal_involvements',
  'clean_sheets',
  'goals_conceded',
  'expected_goals_conceded',
  'own_goals',
  'penalties_saved',
  'penalties_missed',
  'yellow_cards',
  'red_cards',
  'saves',
  'bonus',
  'bps',
  'influence',
  'creativity',
  'threat',
  'ict_index',
];

const tableHeadTooltips = [
  'Player',
  'Points',
  'Started',
  'Minutes',
  'Goals Scored',
  'Assists',
  'Expected Goals',
  'Expected Assists',
  'Expected Goal Involvements',
  'Clean Sheets',
  'Goals Conceded',
  'Expected Goals Conceded',
  'Own Goals',
  'Penalties Saved',
  'Penalties Missed',
  'Yellow Cards',
  'Red Cards',
  'Saves',
  'Bonus',
  'Bonus Points System',
  'Influence',
  'Creativity',
  'Threat',
  'ICT Index',
];

type PlayerStatsHeadProps = ElementStatName | 'web_name' | 'total_points';

type Props = {
  fixtureId: number;
};

const PlayerStatsTable = ({fixtureId}: Props) => {
  const [playerStatsFilter, setPlayerStatsFilter] = useState<'all' | 'h' | 'a'>(
    'all',
  );

  const {data: bData, isFetching: bFetching} = useQuery(
    ['bootstrapStatic'],
    fetchBootstrapStatic,
    {cacheTime: Infinity},
  );

  const {data: fsData, isFetching: fsFetching} = useQuery(
    ['fixtureStats', fixtureId],
    () => fetchFixtureStats(fixtureId),
    {staleTime: 10000},
  );

  const {data, widthArr} = useMemo(() => {
    let stats = [];

    if (playerStatsFilter === 'h') {
      stats = fsData?.h || [];
    } else if (playerStatsFilter === 'a') {
      stats = fsData?.a || [];
    } else {
      stats = [...(fsData?.h || []), ...(fsData?.a || [])];
    }

    // sort by points and include web_name of every player, return only values
    const _data = stats
      .sort((a, b) => b.total_points - a.total_points)
      .map(s =>
        Object.values({
          web_name:
            bData?.elements.find(el => el.id === s.element)?.web_name || '',
          total_points: s.total_points,
          starts: s.starts,
          minutes: s.minutes,
          goals_scored: s.goals_scored,
          assists: s.assists,
          expected_goals: s.expected_goals,
          expected_assists: s.expected_assists,
          expected_goal_involvements: s.expected_goal_involvements,
          clean_sheets: s.clean_sheets,
          goals_conceded: s.goals_conceded,
          expected_goals_conceded: s.expected_goals_conceded,
          own_goals: s.own_goals,
          penalties_saved: s.penalties_saved,
          penalties_missed: s.penalties_missed,
          yellow_cards: s.yellow_cards,
          red_cards: s.red_cards,
          saves: s.saves,
          bonus: s.bonus,
          bps: s.bps,
          influence: s.influence,
          creativity: s.creativity,
          threat: s.threat,
          ict_index: s.ict_index,
        }),
      );

    return {
      data: _data,
      widthArr: [80, ...Array(tableHeadLabels.length - 1).fill(40)],
    };
  }, [bData, fsData, playerStatsFilter]);

  if (bFetching || fsFetching) {
    return (
      <LoadingView
        withoutTitle
        position="relative"
        indicatorColor={colors.accentDark}
      />
    );
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      contentContainerStyle={tableStyles.scrollContentContainer}>
      <View>
        <Table borderStyle={tableStyles.headerBorder}>
          <Row
            data={tableHeadLabels}
            widthArr={widthArr}
            style={tableStyles.headerContainer}
            textStyle={tableStyles.headerText}
          />
        </Table>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={tableStyles.dataWrapper}>
          <Table borderStyle={tableStyles.rowBorder}>
            {data.map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={[tableStyles.rowContainer]}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellData}
                    width={widthArr[cellIndex]}
                    textStyle={
                      cellIndex === 0
                        ? tableStyles.headerText
                        : tableStyles.rowText
                    }
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default PlayerStatsTable;

const tableStyles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
  },
  headerBorder: {borderWidth: 1, borderColor: colors.accentDark},
  headerContainer: {height: 50, backgroundColor: colors.purePrimary},
  headerText: {
    textAlign: 'center',
    color: colors.textDark2,
    fontSize: sizes.sm,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  dataWrapper: {marginTop: -1, flex: 0},
  rowBorder: {borderWidth: 1, borderColor: '#C1C0B9'},
  rowContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#E7E6E1',
  },
  rowText: {
    textAlign: 'center',
    color: colors.textDark1,
    fontSize: sizes.sm,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
