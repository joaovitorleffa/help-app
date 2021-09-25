import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OrganizationNavigatorParamsList } from '../types';

import { OrganizationAppStack } from './app.routes';
import { OrganizationAuthStack } from './auth.routes';
import { AddCause, EditProfile, EditCause } from '@screens/Organization';

const Stack = createStackNavigator<OrganizationNavigatorParamsList>();

export function OrganizationRoutes(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppStack" component={OrganizationAppStack} />
      <Stack.Screen name="AuthStack" component={OrganizationAuthStack} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddCause" component={AddCause} />
      <Stack.Screen name="EditCause" component={EditCause} />
    </Stack.Navigator>
  );
}
