import React from 'react';
import { useAuth } from '@hooks/useAuth';

import { OrganizationNavigatorParamsList } from '../types';

import { OrganizationAppStack } from './app.routes';
import { OrganizationAuthStack } from './auth.routes';
import { AddCause, EditProfile, EditCause, Cause, AddFeedback } from '@screens/Organization';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator<OrganizationNavigatorParamsList>();

export function OrganizationRoutes(): JSX.Element {
  const { accessToken } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken ? (
        <>
          <Stack.Screen name="AppStack" component={OrganizationAppStack} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="AddCause" component={AddCause} />
          <Stack.Screen name="EditCause" component={EditCause} />
          <Stack.Screen name="Cause" component={Cause} />
          <Stack.Screen name="AddFeedback" component={AddFeedback} />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={OrganizationAuthStack} />
      )}
    </Stack.Navigator>
  );
}
