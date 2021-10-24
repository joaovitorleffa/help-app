import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '@hooks/useAuth';
import { PersonNavigatorParamsList } from '@routes/types';

import { PersonAppTabStack } from './app.routes';
import { Initial, SignIn, SignUp } from '@screens/Person';

const Stack = createStackNavigator<PersonNavigatorParamsList>();

export function PersonRoutes(): JSX.Element {
  const { accessToken } = useAuth();

  return (
    <Stack.Navigator>
      {accessToken ? (
        <Stack.Screen
          name="PersonAppTab"
          component={PersonAppTabStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen name="PersonInitial" component={Initial} options={{ headerShown: false }} />
          <Stack.Screen name="PersonSignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="PersonSignIn" component={SignIn} options={{ headerShown: false }} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
