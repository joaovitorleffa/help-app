import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OrganizationNavigatorParamsList } from '../types';

import { OrganizationAppStack } from './app.routes';
import { OrganizationAuthStack } from './auth.routes';
import { AddCause, EditProfile } from '@screens/Organization';

const Stack = createStackNavigator<OrganizationNavigatorParamsList>();

export function OrganizationRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppStack" component={OrganizationAppStack} />
      <Stack.Screen name="AuthStack" component={OrganizationAuthStack} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddCause" component={AddCause} />
    </Stack.Navigator>
  );
}
