import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './PlayerPickView.styles';
import {PlayerPickEventLiveDelegate} from 'src/types/api';
import {playerImageUri} from '@services/api';
import StarIcon from '@assets/svgs/StarIcon';
import {isNullOrEmpty} from '@utils/isNullOrEmpty';
import AlertIcon from '@assets/svgs/AlertIcon';

type Props = {
  player: PlayerPickEventLiveDelegate;
};

const PlayerPickView = ({player}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRightContainer}>
        {player.is_captain && (
          <View style={styles.iconContainer}>
            <Text style={styles.captain}>C</Text>
          </View>
        )}
        {player.is_vice_captain && (
          <View style={styles.iconContainer}>
            <Text style={styles.captain}>V</Text>
          </View>
        )}
        {!isNullOrEmpty(player.news) && (
          <View style={styles.alertIconContainer}>
            <AlertIcon
              type={player.news?.includes('%') ? 'warning' : 'danger'}
            />
          </View>
        )}
        {player.stats.in_dreamteam && (
          <View style={styles.iconContainer}>
            <StarIcon />
          </View>
        )}
      </View>

      <Image
        source={{uri: playerImageUri(player.code)}}
        style={styles.playerImg}
      />
      <View style={styles.textContainer}>
        <Text style={styles.playerName} adjustsFontSizeToFit numberOfLines={1}>
          {player.web_name}
        </Text>
        <Text style={styles.eventPoints}>
          {player.stats.starts ? player.stats.total_points : '-'}
        </Text>
      </View>
    </View>
  );
};

export default PlayerPickView;
