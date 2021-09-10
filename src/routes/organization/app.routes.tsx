import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OrganizationAppNavigatorParamsList } from '../types';

import { SignIn } from '@screens/Organization';

const Stack = createStackNavigator<OrganizationAppNavigatorParamsList>();

export function OrganizationAppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={SignIn} />
    </Stack.Navigator>
  );
}
