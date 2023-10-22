import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Stats from '@screens/Stats';
import {StatsStackProps} from 'src/types/navigation';

const Stack = createStackNavigator<StatsStackProps>();

const StatsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Stats" component={Stats} />
    </Stack.Navigator>
  );
};

export default StatsStack;
