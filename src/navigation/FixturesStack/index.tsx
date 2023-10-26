import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Fixtures from '@screens/Fixtures';
import {FixturesStackProps} from 'src/types/navigation';

const Stack = createStackNavigator<FixturesStackProps>();

const FixturesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Fixtures" component={Fixtures} />
    </Stack.Navigator>
  );
};

export default FixturesStack;
