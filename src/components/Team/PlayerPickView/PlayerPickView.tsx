import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './PlayerPickView.styles';
import {TeamPlayerDelegate, PosNameArr, DreamTeamPlayer} from 'src/types/api';
import {playerImageUri} from '@services/api';
import StarIcon from '@assets/svgs/StarIcon';
import {isNullOrEmpty} from '@utils/isNullOrEmpty';
import AlertIcon from '@assets/svgs/AlertIcon';
import {getTeamShirt} from '@utils/getTeamShirt';
import Captain from '@components/common/Captain';
import ChevronIcon from '@assets/svgs/ChevronIcon';

type Props = {
  player: TeamPlayerDelegate | DreamTeamPlayer;
  showPosition?: boolean;
  showLineup?: boolean;
};

const PlayerPickView = ({player, showPosition, showLineup}: Props) => {
  const [imgError, setImgError] = useState(false);

  const renderPointsView = () => {
    let lineUpIconRotation: 'up' | 'down' | null = null;
    if (showLineup) {
      // for bench players
      if (player.tsType === 'TeamPlayer' && player.in_lineup) {
        lineUpIconRotation = 'up';
      }
    } else {
      if (player.tsType === 'TeamPlayer' && !player.in_lineup) {
        // for first 11 players
        lineUpIconRotation = 'down';
      }
    }

    return (
      <View style={styles.eventPointsContainer}>
        {lineUpIconRotation && (
          <View style={styles.lineupIconContainer}>
            <ChevronIcon rotation={lineUpIconRotation} />
          </View>
        )}
        {player.tsType === 'DreamTeamPlayer' || player.fixture_started ? (
          <Text
            style={[
              styles.eventPoints,
              ((player.tsType === 'TeamPlayer' && player.fixture_started) ||
                player.tsType === 'DreamTeamPlayer') &&
                styles.eventPointsStarted,
            ]}>
            {player.tsType === 'TeamPlayer'
              ? player.total_points_live
              : player.points}
          </Text>
        ) : (
          <Text
            style={[
              styles.rivalTeamName,
              lineUpIconRotation && styles.rivalTeamNameLineup,
            ]}>
            {!isNullOrEmpty(player.rival_team_short_name)
              ? `${player.rival_team_short_name} ${
                  player.fixture_home ? ' (H)' : ' (A)'
                }`
              : '-'}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View
      testID="playerPickViewContainer"
      style={[styles.container, showPosition && styles.containerPosHeight]}>
      {showPosition && (
        <Text style={styles.elementType}>
          {PosNameArr[player.element_type - 1]}
        </Text>
      )}
      <View
        style={[
          styles.topRightContainer,
          showPosition && styles.topRightPosContainer,
        ]}>
        {player.tsType === 'TeamPlayer' && player.is_captain && <Captain />}
        {player.tsType === 'TeamPlayer' && player.is_vice_captain && (
          <Captain type="V" />
        )}
        {!isNullOrEmpty(player.news) && (
          <View style={styles.alertIconContainer}>
            <AlertIcon
              type={player.news?.includes('%') ? 'warning' : 'danger'}
            />
          </View>
        )}
        {(player.tsType === 'DreamTeamPlayer' || player.in_dreamteam) && (
          <View style={styles.iconContainer}>
            <StarIcon />
          </View>
        )}
      </View>
      <Image
        source={
          imgError
            ? getTeamShirt(player.team, player.element_type)
            : {uri: playerImageUri(player.code)}
        }
        style={styles.playerImg}
        onError={() => setImgError(true)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.playerName} adjustsFontSizeToFit numberOfLines={1}>
          {player.web_name}
        </Text>
        {renderPointsView()}
      </View>
    </View>
  );
};

export default PlayerPickView;
