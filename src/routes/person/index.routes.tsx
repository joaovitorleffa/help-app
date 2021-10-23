import { createStackNavigator } from '@react-navigation/stack';
import { PersonNavigatorParamsList } from '@routes/types';
import { Initial, SignIn, SignUp } from '@screens/Person';
import { Home } from '@screens/Person/Home';
import React from 'react';

const Stack = createStackNavigator<PersonNavigatorParamsList>();

export function PersonRoutes(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="PersonInitial">
      <Stack.Screen name="PersonInitial" component={Initial} options={{ headerShown: false }} />
      <Stack.Screen name="PersonHome" component={Home} />
      <Stack.Screen name="PersonSignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="PersonSignIn" component={SignIn} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
