import {View, Text} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps} from 'src/types/navigation';

type Props = StackScreenProps<LeaguesStackProps, 'LeagueDetails'>;

const LeagueDetails = ({navigation, route}: Props) => {
  console.log('route.params', route.params);

  useLayoutEffect(() =>
    navigation.setOptions({
      headerTitle: route.params.leagueName,
    }),
  );

  return (
    <View>
      <Text>LeagueDetails</Text>
    </View>
  );
};

export default LeagueDetails;
