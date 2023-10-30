import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './FixtureView.styles';
import Touchable from '@components/common/Touchable';
import {DateFixture} from 'src/types/api';
import {getTeamLogo} from '@utils/getTeamLogo';
import dayjs from 'dayjs';

type Props = {
  fixture: DateFixture;
  onPress?: () => void;
};

const FixtureView = ({fixture, onPress}: Props) => (
  <Touchable
    key={fixture.id}
    style={styles.itemContainer}
    disabled={!fixture?.match_details?.length || !onPress}
    preserveOpacity
    onPress={() => onPress && onPress()}>
    <View style={styles.itemLeftContainer}>
      <Text style={[styles.teamName, styles.textRight]}>
        {fixture.team_h_name}
      </Text>
      <Image source={getTeamLogo(fixture.team_h_code)} style={styles.logoImg} />
    </View>
    {fixture.started ? (
      <Text
        style={[
          styles.scores,
          fixture.finished_provisional && styles.scoresFinished,
        ]}>{`${fixture.team_h_score} - ${fixture.team_a_score}`}</Text>
    ) : (
      <Text style={styles.time}>
        {dayjs(fixture.kickoff_time).format('HH:mm')}
      </Text>
    )}
    <View style={styles.itemRightContainer}>
      <Image source={getTeamLogo(fixture.team_a_code)} style={styles.logoImg} />
      <Text style={[styles.teamName, styles.textLeft]}>
        {fixture.team_a_name}
      </Text>
    </View>
  </Touchable>
);

export default FixtureView;
