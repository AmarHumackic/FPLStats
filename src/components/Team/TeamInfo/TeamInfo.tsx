import {View, Text} from 'react-native';
import React from 'react';
import styles from './TeamInfo.styles';
import Touchable from '@components/common/Touchable';
import ChevronLeftIcon from '@assets/svgs/ChevronLeftIcon';
import ChevronRightIcon from '@assets/svgs/ChevronRightIcon';
import SwapHorizontalIcon from '@assets/svgs/SwapHorizontalIcon';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LeaguesStackProps, TeamStackProps} from 'src/types/navigation';
import {colors} from '@constants/colors';
import {ChipTypes} from 'src/types/api';

type Props = {
  teamName?: string;
  managerName?: string;
  viewingEventId: number;
  currentEventId: number;
  onPreviousEvent: () => void;
  onNextEvent: () => void;
  eventTransfers?: number;
  eventTransfersCost?: number;
  avgEventScore?: number;
  eventPoints: number;
  highestEventScoreId?: number;
  highestEventScore?: number;
  activeChip?: 'wildcard' | '3xc' | 'freehit' | 'bboost';
};

const TeamInfo = ({
  teamName,
  managerName,
  viewingEventId,
  currentEventId,
  onPreviousEvent,
  onNextEvent,
  eventTransfers,
  eventTransfersCost,
  avgEventScore,
  eventPoints,
  highestEventScoreId,
  highestEventScore,
  activeChip,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<TeamStackProps | LeaguesStackProps, 'Team'>
    >();

  return (
    <View style={styles.upperContainer}>
      {teamName && (
        <Text style={styles.teamNameLabel}>
          {teamName}
          {managerName && (
            <Text style={styles.playerNameLabel}>{` (${managerName})`}</Text>
          )}
        </Text>
      )}
      <View style={styles.eventSwitchContainer}>
        {(eventTransfers || eventTransfers === 0) && (
          <View style={styles.flexView} />
        )}
        <Touchable
          disabled={viewingEventId <= 1}
          style={styles.chevronContainer}
          onPress={onPreviousEvent}>
          <ChevronLeftIcon />
        </Touchable>
        <Text
          style={styles.eventNameLabel}>{`Gameweek ${viewingEventId}`}</Text>
        <Touchable
          disabled={viewingEventId >= currentEventId}
          style={styles.chevronContainer}
          onPress={onNextEvent}>
          <ChevronRightIcon />
        </Touchable>
        {(eventTransfers || eventTransfers === 0) && (
          <View style={styles.eventTransfersContainer}>
            <SwapHorizontalIcon />
            <Text
              style={styles.eventTransfers}
              adjustsFontSizeToFit
              numberOfLines={1}>{`${eventTransfers}${
              eventTransfersCost ? ` (-${eventTransfersCost})` : ''
            }`}</Text>
          </View>
        )}
      </View>
      <View style={styles.pointsContainer}>
        {avgEventScore ? (
          <View style={styles.avgPointsContainer}>
            <Text style={styles.pointsValue}>{avgEventScore}</Text>
            <Text style={styles.pointsLabel}> average</Text>
          </View>
        ) : null}
        <View style={styles.currentPointsContainer}>
          <Text style={styles.currentPointsValue}>{eventPoints}</Text>
          <Text style={styles.currentPointsLabel}> points</Text>
        </View>
        {avgEventScore ? (
          <Touchable
            style={styles.avgPointsContainer}
            disabled={!highestEventScoreId}
            onPress={() =>
              navigation.push('Team', {teamId: highestEventScoreId})
            }>
            <Text style={styles.pointsValue}>{highestEventScore || '-'}</Text>
            <Text style={styles.pointsLabel}> highest</Text>
            <ChevronRightIcon
              width={18}
              height={18}
              color={colors.accentDark1}
            />
          </Touchable>
        ) : null}
      </View>

      <View style={styles.activeChipContainer}>
        {activeChip && (
          <Text style={styles.activeChipLabel}>
            {ChipTypes?.[activeChip] || ''}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TeamInfo;
