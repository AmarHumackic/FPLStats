import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Live from '@screens/Live';
import {LiveStackProps} from 'src/types/navigation';

const Stack = createStackNavigator<LiveStackProps>();

const LiveStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Live" component={Live} />
    </Stack.Navigator>
  );
};

export default LiveStack;
