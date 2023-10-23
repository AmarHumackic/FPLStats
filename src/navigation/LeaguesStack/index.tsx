import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Leagues from '@screens/Leagues';
import {LeaguesStackProps} from 'src/types/navigation';
import LeagueDetails from '@screens/LeagueDetails';
import Team from '@screens/Team';
import {HeaderBackButton} from '@react-navigation/elements';
import {renderNavElement} from '@navigation/utils/renderNavElement';
import {defaultStackOptions} from '@navigation/utils/defaultStackOptions';

const Stack = createStackNavigator<LeaguesStackProps>();

const LeaguesStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen
        name="Leagues"
        component={Leagues}
        options={{headerShown: false}}
      />
      <Stack.Screen name="LeagueDetails" component={LeagueDetails} />
      <Stack.Screen
        name="Team"
        component={Team}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: props =>
            renderNavElement(<HeaderBackButton {...props} />),
        }}
      />
    </Stack.Navigator>
  );
};

export default LeaguesStack;
