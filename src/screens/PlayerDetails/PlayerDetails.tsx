import {Text, Button, View, Image} from 'react-native';
import React from 'react';
import styles from './PlayerDetails.styles';
import {useSessionContext} from '@services/sessionContext';
import {getTeamShirt} from '@utils/getTeamShirt';
import {playerImageUri} from '@services/api';

type Props = {};

const PlayerDetails = ({}: Props) => {
  const {removeSessionHandler} = useSessionContext();

  return (
    <View style={styles.container}>
      {/* <Image
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
      </View> */}
    </View>
  );
};

export default PlayerDetails;
