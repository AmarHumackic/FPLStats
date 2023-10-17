import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TeamStack from '@navigation/TeamStack';
import LiveStack from '@navigation/LiveStack';
import StatsStack from '@navigation/StatsStack';
import LeaguesStack from '@navigation/LeaguesStack';
import ProfileStack from '@navigation/ProfileStack';
import {colors} from '@constants/';
import SoccerFieldIcon from '@assets/svgs/SoccerFieldIcon';
import {renderNavElement} from '@navigation/utils/renderNavElement';
import AntennaIcon from '@assets/svgs/AntennaIcon';
import PollIcon from '@assets/svgs/PollIcon';
import AccountGroupIcon from '@assets/svgs/AccountGroupIcon';
import AccountCogIcon from '@assets/svgs/AccountCogIcon';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.accentDark,
        tabBarInactiveTintColor: colors.text,
      }}>
      <Tab.Screen
        name="TeamStack"
        component={TeamStack}
        options={{
          tabBarLabel: 'Team',
          tabBarIcon: ({color}) =>
            renderNavElement(<SoccerFieldIcon color={color} />),
        }}
      />
      <Tab.Screen
        name="LiveStack"
        component={LiveStack}
        options={{
          tabBarLabel: 'Live',
          tabBarIcon: ({color}) =>
            renderNavElement(<AntennaIcon color={color} />),
        }}
      />
      <Tab.Screen
        name="StatsStack"
        component={StatsStack}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({color}) => renderNavElement(<PollIcon color={color} />),
        }}
      />
      <Tab.Screen
        name="LeaguesStack"
        component={LeaguesStack}
        options={{
          tabBarLabel: 'Leagues',
          tabBarIcon: ({color}) =>
            renderNavElement(<AccountGroupIcon color={color} />),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) =>
            renderNavElement(<AccountCogIcon color={color} />),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
