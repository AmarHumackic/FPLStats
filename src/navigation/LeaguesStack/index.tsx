import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Leagues from '@screens/Leagues';

const Stack = createStackNavigator();

const LeaguesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Leagues" component={Leagues} />
    </Stack.Navigator>
  );
};

export default LeaguesStack;
