import {ImageBackground, View} from 'react-native';
import React, {useMemo} from 'react';
import styles from './EventPicksView.styles';
import {PlayerPickEventLiveDelegate} from 'src/types/api';
import PlayerPickView from '../PlayerPickView';
import SoccerFieldBackground from '@assets/images/SoccerFieldBackground.png';

type Props = {
  picks: PlayerPickEventLiveDelegate[];
};

const EventPicksView = ({picks}: Props) => {
  const {
    goalKeepersM,
    defendersM,
    midfieldersM,
    forwardersM,
    bench,
    hasCaptainPlayed,
  } = useMemo(
    () => ({
      goalKeepersM: picks.filter(p => p.element_type === 1 && p.multiplier),
      defendersM: picks.filter(p => p.element_type === 2 && p.multiplier),
      midfieldersM: picks.filter(p => p.element_type === 3 && p.multiplier),
      forwardersM: picks.filter(p => p.element_type === 4 && p.multiplier),
      bench: picks.filter(p => !p.multiplier),
      hasCaptainPlayed: picks.filter(p => p.is_captain)[0]?.stats.minutes > 0,
    }),
    [picks],
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SoccerFieldBackground}
        style={styles.soccerFieldContainer}>
        <View style={styles.rowContainer}>
          {goalKeepersM.map(el => (
            <PlayerPickView
              key={el.id}
              player={el}
              hasCaptainPlayed={hasCaptainPlayed}
            />
          ))}
        </View>
        <View style={styles.rowContainer}>
          {defendersM.map(el => (
            <PlayerPickView
              key={el.id}
              player={el}
              hasCaptainPlayed={hasCaptainPlayed}
            />
          ))}
        </View>
        <View style={styles.rowContainer}>
          {midfieldersM.map(el => (
            <PlayerPickView
              key={el.id}
              player={el}
              hasCaptainPlayed={hasCaptainPlayed}
            />
          ))}
        </View>
        <View style={styles.rowContainer}>
          {forwardersM.map(el => (
            <PlayerPickView
              key={el.id}
              player={el}
              hasCaptainPlayed={hasCaptainPlayed}
            />
          ))}
        </View>
      </ImageBackground>

      <View style={styles.benchContainer}>
        {bench.map(el => (
          <PlayerPickView
            key={el.id}
            player={el}
            hasCaptainPlayed={hasCaptainPlayed}
          />
        ))}
      </View>
    </View>
  );
};

export default EventPicksView;
