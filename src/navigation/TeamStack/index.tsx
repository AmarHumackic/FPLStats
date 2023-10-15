import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Team from '@screens/Team';

const Stack = createStackNavigator();

const TeamStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Team" component={Team} />
    </Stack.Navigator>
  );
};

export default TeamStack;
