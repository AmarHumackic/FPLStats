import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '@screens/Profile';
import {ProfileStackProps} from 'src/types/navigation';

const Stack = createStackNavigator<ProfileStackProps>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
