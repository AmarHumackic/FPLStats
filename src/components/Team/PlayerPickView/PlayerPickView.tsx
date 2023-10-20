import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './PlayerPickView.styles';
import {PlayerPickEventLiveDelegate} from 'src/types/api';
import {playerImageUri} from '@services/api';
import StarIcon from '@assets/svgs/StarIcon';
import {isNullOrEmpty} from '@utils/isNullOrEmpty';
import AlertOctagonIcon from '@assets/svgs/AlertOctagonIcon';

type Props = {
  player: PlayerPickEventLiveDelegate;
  hasCaptainPlayed: boolean;
};

const PlayerPickView = ({player, hasCaptainPlayed}: Props) => {
  const getEventPoints = (eventPoints: number) => {
    if (
      (player.is_captain && hasCaptainPlayed) ||
      (player.is_vice_captain && !hasCaptainPlayed)
    ) {
      return eventPoints * 2;
    } else {
      return eventPoints;
    }
  };

  return (
    <View style={styles.container}>
      {player.is_captain && (
        <View style={styles.captainContainer}>
          <Text style={styles.captain}>C</Text>
        </View>
      )}
      {player.is_vice_captain && (
        <View style={styles.captainContainer}>
          <Text style={styles.captain}>V</Text>
        </View>
      )}
      {player.stats.in_dreamteam && (
        <View style={styles.starContainer}>
          <StarIcon />
        </View>
      )}
      {!isNullOrEmpty(player.news) && (
        <View style={{}}>
          <AlertOctagonIcon />
        </View>
      )}
      <Image
        source={{uri: playerImageUri(player.code)}}
        style={styles.playerImg}
      />
      <View style={styles.textContainer}>
        <Text style={styles.playerName} adjustsFontSizeToFit numberOfLines={1}>
          {player.web_name}
        </Text>
        <Text style={styles.eventPoints}>
          {getEventPoints(player.event_points)}
        </Text>
      </View>
    </View>
  );
};

export default PlayerPickView;
