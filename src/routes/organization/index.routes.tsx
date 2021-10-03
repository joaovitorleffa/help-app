import React from 'react';

import { OrganizationNavigatorParamsList } from '../types';

import { OrganizationAppStack } from './app.routes';
import { OrganizationAuthStack } from './auth.routes';
import { AddCause, EditProfile, EditCause, Cause } from '@screens/Organization';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator<OrganizationNavigatorParamsList>();

export function OrganizationRoutes(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppStack" component={OrganizationAppStack} />
      <Stack.Screen name="AuthStack" component={OrganizationAuthStack} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddCause" component={AddCause} />
      <Stack.Screen name="EditCause" component={EditCause} />
      <Stack.Screen name="Cause" component={Cause} />
    </Stack.Navigator>
  );
}
