import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Leagues from '@screens/Leagues';
import {LeaguesStackProps} from 'src/types/navigation';
import LeagueDetails from '@screens/LeagueDetails';
import Team from '@screens/Team';
import {HeaderBackButton} from '@react-navigation/elements';
import {renderNavElement} from '@navigation/utils/renderNavElement';
import {defaultStackOptions} from '@navigation/utils/defaultStackOptions';
import DreamTeam from '@screens/DreamTeam';

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
    </Stack.Navigator>
  );
};

export default LeaguesStack;
