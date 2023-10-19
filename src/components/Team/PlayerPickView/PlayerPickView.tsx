import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './PlayerPickView.styles';
import {PlayerPickDelegate} from 'src/types/api';
import {playerImageUri} from '@services/api';

type Props = {
  player: PlayerPickDelegate;
};

const PlayerPickView = ({player}: Props) => (
  <View style={styles.container}>
    {player.is_captain && <Text style={styles.captain}>C</Text>}
    {player.is_vice_captain && <Text style={styles.captain}>V</Text>}
    <Image
      source={{uri: playerImageUri(player.code)}}
      style={styles.playerImg}
    />
    <View style={styles.textContainer}>
      <Text style={styles.playerName}>{player.web_name}</Text>
      <Text style={styles.eventPoints}>{player.event_points}</Text>
    </View>
  </View>
);

export default PlayerPickView;
