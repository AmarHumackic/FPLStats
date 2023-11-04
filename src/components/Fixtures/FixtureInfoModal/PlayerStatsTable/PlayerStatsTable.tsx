import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import styles from './PlayerStatsTable.styles';
import LoadingView from '@components/common/LoadingView';
import {Table, TableWrapper, Cell} from 'react-native-reanimated-table';
import {useQuery} from '@tanstack/react-query';
import {fetchBootstrapStatic, fetchFixtureStats} from '@services/api';
import {colors} from '@constants/colors';
import TabsView from '@components/common/TabsView';
import {sizes} from '@constants/sizes';
import Touchable from '@components/common/Touchable';
import FlashMessage from 'react-native-flash-message';

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

type Props = {
  fixtureId: number;
  teamHName: string;
  teamAName: string;
};

const PlayerStatsTable = ({fixtureId, teamHName, teamAName}: Props) => {
  const [activeFilter, setActiveFilter] = useState(1);
  const headScrollRef = useRef<ScrollView>(null);
  const messageRef = useRef<FlashMessage>(null);

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

  const onScrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    headScrollRef.current?.scrollTo({
      x: e.nativeEvent.contentOffset.x,
    });
  };

  const renderTableHead = () => (
    <Table>
      <TableWrapper style={styles.headerContainer}>
        <View style={styles.tableRowContainer}>
          <Touchable
            style={styles.headerTouchableContainer}
            onPress={() =>
              messageRef.current?.showMessage({
                backgroundColor: colors.accentDark,
                message: tableHeadTooltips[0],
              })
            }>
            <Cell
              data={tableHeadLabels[0]}
              width={webNameWidth}
              textStyle={styles.headerText}
            />
          </Touchable>
          <ScrollView
            ref={headScrollRef}
            horizontal={true}
            contentContainerStyle={styles.scrollContentContainer}
            showsHorizontalScrollIndicator={false}>
            {tableHeadLabels.slice(1).map((label, index) => (
              <Touchable
                key={label}
                style={styles.headerTouchableContainer}
                onPress={() =>
                  messageRef.current?.showMessage({
                    backgroundColor: colors.accentDark,
                    message: tableHeadTooltips[index],
                  })
                }>
                <Cell
                  data={label}
                  textStyle={styles.headerText}
                  width={widthArr[index]}
                />
              </Touchable>
            ))}
          </ScrollView>
        </View>
      </TableWrapper>
    </Table>
  );

  const renderTableWebNames = () => (
    <Table>
      <TableWrapper>
        {webNames.map((webName, index) => (
          <Cell
            key={index}
            data={webName}
            width={webNameWidth}
            height={30}
            textStyle={styles.headerText}
          />
        ))}
      </TableWrapper>
    </Table>
  );

  const renderTableData = () => (
    <Table>
      {data.map((rowData, rowIndex) => (
        <TableWrapper key={rowIndex} style={styles.rowContainer}>
          {rowData.map((cellData, cellIndex) => (
            <Cell
              key={cellIndex}
              data={cellData}
              width={widthArr[cellIndex]}
              textStyle={styles.rowText}
            />
          ))}
        </TableWrapper>
      ))}
    </Table>
  );

  const {webNames, data, webNameWidth, widthArr} = useMemo(() => {
    let stats = [];

    if (activeFilter === 2) {
      stats = fsData?.h || [];
    } else if (activeFilter === 3) {
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
      webNames: _data.map(d => d.shift()),
      data: _data,
      webNameWidth: 90,
      widthArr: Array(tableHeadLabels.length - 1).fill(40),
    };
  }, [bData, fsData, activeFilter]);

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
    <>
      <TabsView
        activeTab={activeFilter}
        setActiveTab={setActiveFilter}
        labels={['All', teamHName, teamAName]}
        textColor={colors.accentDark}
        textSize={sizes.sm}
        activeBgColor={colors.accentDark}
        activeTextColor={colors.primary}
        containerStyle={styles.tabContainer}
        itemContainerStyle={styles.tabItemContainer}
      />
      {renderTableHead()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.tableRowContainer}>
          {renderTableWebNames()}
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollContentContainer}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScrollHandler}
            onScrollEndDrag={onScrollHandler}>
            {renderTableData()}
          </ScrollView>
        </View>
      </ScrollView>

      <FlashMessage position="center" ref={messageRef} />
    </>
  );
};

export default PlayerStatsTable;
