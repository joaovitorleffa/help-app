import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OrganizationAppNavigatorParamsList } from '../types';

import { Home } from '@screens/Organization/Home';

const Stack = createStackNavigator<OrganizationAppNavigatorParamsList>();

export function OrganizationAppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
