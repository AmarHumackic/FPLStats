import {ImageBackground, View} from 'react-native';
import React from 'react';
import styles from './EventPicksView.styles';
import {DreamTeamPlayer, TeamPlayerDelegate} from 'src/types/api';
import PlayerPickView from '../PlayerPickView';
import SoccerFieldBackground from '@assets/images/SoccerFieldBackground.png';

type Props = {
  goalKeepersM: TeamPlayerDelegate[] | DreamTeamPlayer[];
  defendersM: TeamPlayerDelegate[] | DreamTeamPlayer[];
  midfieldersM: TeamPlayerDelegate[] | DreamTeamPlayer[];
  forwardersM: TeamPlayerDelegate[] | DreamTeamPlayer[];
  bench?: TeamPlayerDelegate[] | DreamTeamPlayer[];
  onDetailsHandler: (player: TeamPlayerDelegate | DreamTeamPlayer) => void;
};

const EventPicksView = ({
  goalKeepersM,
  defendersM,
  midfieldersM,
  forwardersM,
  bench,
  onDetailsHandler,
}: Props) => (
  <View style={styles.container}>
    <ImageBackground
      source={SoccerFieldBackground}
      style={styles.soccerFieldContainer}>
      <View style={styles.rowContainer}>
        {goalKeepersM.map(el => (
          <PlayerPickView
            key={el.id}
            player={el}
            onDetailsHandler={onDetailsHandler}
          />
        ))}
      </View>
      <View style={styles.rowContainer}>
        {defendersM.map(el => (
          <PlayerPickView
            key={el.id}
            player={el}
            onDetailsHandler={onDetailsHandler}
          />
        ))}
      </View>
      <View style={styles.rowContainer}>
        {midfieldersM.map(el => (
          <PlayerPickView
            key={el.id}
            player={el}
            onDetailsHandler={onDetailsHandler}
          />
        ))}
      </View>
      <View style={styles.rowContainer}>
        {forwardersM.map(el => (
          <PlayerPickView
            key={el.id}
            player={el}
            onDetailsHandler={onDetailsHandler}
          />
        ))}
      </View>
    </ImageBackground>

    {bench && (
      <View style={styles.benchContainer}>
        {bench.map(el => (
          <PlayerPickView
            key={el.id}
            player={el}
            showPosition
            showLineup={bench ? true : false}
            onDetailsHandler={onDetailsHandler}
          />
        ))}
      </View>
    )}
  </View>
);

export default EventPicksView;
