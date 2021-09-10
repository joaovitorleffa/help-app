import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OrganizationNavigatorParamsList } from '../types';

import { OrganizationAppStack } from './app.routes';
import { OrganizationAuthStack } from './auth.routes';

const Stack = createStackNavigator<OrganizationNavigatorParamsList>();

export function OrganizationRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppStack" component={OrganizationAppStack} />
      <Stack.Screen name="AuthStack" component={OrganizationAuthStack} />
    </Stack.Navigator>
  );
}
