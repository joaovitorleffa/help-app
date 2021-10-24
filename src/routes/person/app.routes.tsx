import React from 'react';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PersonAppTabNavigationParamsList } from '@routes/types';

import { Causes, Profile } from '@screens/Person';
import { TabBar } from '@templates/Common/TabBar';
import { useTheme } from 'styled-components';

const Stack = createBottomTabNavigator<PersonAppTabNavigationParamsList>();

export function PersonAppTabStack(): JSX.Element {
  const theme = useTheme();
  return (
    <Stack.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.title_secondary,
      }}>
      <Stack.Screen
        name="PersonCauses"
        component={Causes}
        options={{
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
        }}
      />
      <Stack.Screen
        name="PersonProfile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Stack.Navigator>
  );
}
