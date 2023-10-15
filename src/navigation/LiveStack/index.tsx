import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Live from '@screens/Live';

const Stack = createStackNavigator();

const LiveStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Live" component={Live} />
    </Stack.Navigator>
  );
};

export default LiveStack;
