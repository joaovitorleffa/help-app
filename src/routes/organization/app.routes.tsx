import React from 'react';
import { useTheme } from 'styled-components';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { OrganizationAppNavigatorParamsList } from '../types';

import { TabBar } from '@templates/Common/TabBar';
import { CauseList, Profile } from '@screens/Organization';

const Stack = createBottomTabNavigator<OrganizationAppNavigatorParamsList>();

export function OrganizationAppStack(): JSX.Element {
  const theme = useTheme();

  return (
    <Stack.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.title_secondary,
      }}>
      <Stack.Screen
        name="CauseList"
        component={CauseList}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Stack.Navigator>
  );
}
