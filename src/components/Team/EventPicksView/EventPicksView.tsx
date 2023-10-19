import {ImageBackground, View} from 'react-native';
import React from 'react';
import styles from './EventPicksView.styles';
import {PlayerPickDelegate} from 'src/types/api';
import PlayerPickView from '../PlayerPickView';
import SoccerFieldBackground from '@assets/images/SoccerFieldBackground.png';

type Props = {
  picks: PlayerPickDelegate[];
};

const EventPicksView = ({picks}: Props) => {
  const goalKeepersM = picks.filter(p => p.element_type === 1 && p.multiplier);
  const defendersM = picks.filter(p => p.element_type === 2 && p.multiplier);
  const midfieldersM = picks.filter(p => p.element_type === 3 && p.multiplier);
  const forwardersM = picks.filter(p => p.element_type === 4 && p.multiplier);
  const bench = picks.filter(p => !p.multiplier);

  return (
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
};

export default EventPicksView;
