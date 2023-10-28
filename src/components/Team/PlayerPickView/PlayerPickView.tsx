import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './PlayerPickView.styles';
import {TeamPlayerDelegate, PosNameArr} from 'src/types/api';
import {playerImageUri} from '@services/api';
import StarIcon from '@assets/svgs/StarIcon';
import {isNullOrEmpty} from '@utils/isNullOrEmpty';
import AlertIcon from '@assets/svgs/AlertIcon';
import {getTeamShirt} from '@utils/getTeamShirt';
import Captain from '@components/common/Captain';

type Props = {
  player: TeamPlayerDelegate;
  showPosition?: boolean;
};

const PlayerPickView = ({player, showPosition}: Props) => {
  const [imgError, setImgError] = useState(false);

  return (
    <View style={[styles.container, showPosition && styles.containerPosHeight]}>
      {showPosition && (
        <Text style={styles.elementType}>
          {PosNameArr[player.element_type - 1]}
        </Text>
      )}
      <View style={styles.topRightContainer}>
        {player.is_captain && <Captain />}
        {player.is_vice_captain && <Captain type="V" />}
        {!isNullOrEmpty(player.news) && (
          <View style={styles.alertIconContainer}>
            <AlertIcon
              type={player.news?.includes('%') ? 'warning' : 'danger'}
            />
          </View>
        )}
        {player.in_dreamteam && (
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
        <Text
          style={[
            styles.eventPoints,
            player.fixture_started && styles.eventPointsStarted,
            player.fixture_finished &&
              !player.minutes &&
              styles.eventPointsNotPlayed,
          ]}>
          {player.fixture_started
            ? `${player.in_lineup ? 'U-' : 'D-'}${player.total_points_live}`
            : `${player.in_lineup ? 'U-' : 'D-'}${
                player.rival_team_short_name
              }${player.fixture_home ? ' (H)' : ' (A)'}`}
        </Text>
      </View>
    </View>
  );
};

export default PlayerPickView;
