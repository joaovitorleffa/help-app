import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OrganizationAuthNavigatorParamsList } from '../types';

import { Initial, SignIn, FirstStep, SecondStep, ThirdStep } from '@screens/Organization';

const Stack = createStackNavigator<OrganizationAuthNavigatorParamsList>();

export function OrganizationAuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUpFirstStep" component={FirstStep} />
      <Stack.Screen name="SignUpSecondStep" component={SecondStep} />
      <Stack.Screen name="SignUpThirdStep" component={ThirdStep} />
    </Stack.Navigator>
  );
}
