import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Team from '@screens/Team';
import {TeamStackProps} from 'src/types/navigation';
import {renderNavElement} from '@navigation/utils/renderNavElement';
import {HeaderBackButton} from '@react-navigation/elements';
import {defaultStackOptions} from '@navigation/utils/defaultStackOptions';
import DreamTeam from '@screens/DreamTeam';
import Transfers from '@screens/Transfers';
import History from '@screens/History';

const Stack = createStackNavigator<TeamStackProps>();

const TeamStack = () => (
  <Stack.Navigator screenOptions={defaultStackOptions}>
    <Stack.Screen
      name="Team"
      component={Team}
      options={({navigation}) => {
        const canGoBack = navigation.canGoBack();
        return {
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerLeft: props =>
            canGoBack
              ? renderNavElement(<HeaderBackButton {...props} />)
              : null,
        };
      }}
    />
    <Stack.Screen
      name="DreamTeam"
      component={DreamTeam}
      options={({navigation}) => {
        const canGoBack = navigation.canGoBack();
        return {
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerLeft: props =>
            canGoBack
              ? renderNavElement(<HeaderBackButton {...props} />)
              : null,
        };
      }}
    />
    <Stack.Screen name="Transfers" component={Transfers} />
    <Stack.Screen name="History" component={History} />
  </Stack.Navigator>
);

export default TeamStack;
