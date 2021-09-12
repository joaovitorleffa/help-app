import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootNavigatorParamsList } from './types';

import { Success } from '@screens/Success';
import { Greetings } from '@screens/Greetings';
import { OrganizationRoutes } from './organization/index.routes';

const Stack = createStackNavigator<RootNavigatorParamsList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Greeting" component={Greetings} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="OrganizationStack" component={OrganizationRoutes} />
        <Stack.Screen name="PersonStack" component={OrganizationRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
