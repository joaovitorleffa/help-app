import { useAuth } from '@hooks/useAuth';
import { createStackNavigator } from '@react-navigation/stack';
import { PersonNavigatorParamsList } from '@routes/types';
import { Initial, SignIn, SignUp } from '@screens/Person';
import { Home } from '@screens/Person/Home';
import React from 'react';

const Stack = createStackNavigator<PersonNavigatorParamsList>();

export function PersonRoutes(): JSX.Element {
  const { accessToken } = useAuth();
  console.log({ accessToken });
  return (
    <Stack.Navigator>
      {accessToken ? (
        <Stack.Screen name="PersonHome" component={Home} />
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
