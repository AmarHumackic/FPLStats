import {ImageBackground, View} from 'react-native';
import React from 'react';
import styles from './EventPicksView.styles';
import {PlayerPickEventLiveDelegate} from 'src/types/api';
import PlayerPickView from '../PlayerPickView';
import SoccerFieldBackground from '@assets/images/SoccerFieldBackground.png';

type Props = {
  goalKeepersM: PlayerPickEventLiveDelegate[];
  defendersM: PlayerPickEventLiveDelegate[];
  midfieldersM: PlayerPickEventLiveDelegate[];
  forwardersM: PlayerPickEventLiveDelegate[];
  bench: PlayerPickEventLiveDelegate[];
};

const EventPicksView = ({
  goalKeepersM,
  defendersM,
  midfieldersM,
  forwardersM,
  bench,
}: Props) => (
  <View style={styles.container}>
    <ImageBackground
      source={SoccerFieldBackground}
      style={styles.soccerFieldContainer}>
      <View style={styles.rowContainer}>
        {goalKeepersM.map(el => (
          <PlayerPickView key={el.id} player={el} />
        ))}
      </View>
      <View style={styles.rowContainer}>
        {defendersM.map(el => (
          <PlayerPickView key={el.id} player={el} />
        ))}
      </View>
      <View style={styles.rowContainer}>
        {midfieldersM.map(el => (
          <PlayerPickView key={el.id} player={el} />
        ))}
      </View>
      <View style={styles.rowContainer}>
        {forwardersM.map(el => (
          <PlayerPickView key={el.id} player={el} />
        ))}
      </View>
    </ImageBackground>

    <View style={styles.benchContainer}>
      {bench.map(el => (
        <PlayerPickView key={el.id} player={el} />
      ))}
    </View>
  </View>
);

export default EventPicksView;
