import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Leagues from '@screens/Leagues';
import {LeaguesStackProps} from 'src/types/navigation';
import LeagueDetails from '@screens/LeagueDetails';

const Stack = createStackNavigator<LeaguesStackProps>();

const LeaguesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Leagues"
        component={Leagues}
        options={{headerShown: false}}
      />
      <Stack.Screen name="LeagueDetails" component={LeagueDetails} />
    </Stack.Navigator>
  );
};

export default LeaguesStack;
