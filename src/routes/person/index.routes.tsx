import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '@hooks/useAuth';
import { PersonNavigatorParamsList } from '@routes/types';

import { PersonAppTabStack } from './app.routes';
import { CauseDetails, Initial, OngDetails, SignIn, SignUp } from '@screens/Person';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator<PersonNavigatorParamsList>();

export function PersonRoutes(): JSX.Element {
  const { accessToken } = useAuth();

  return (
    <Stack.Navigator>
      {accessToken ? (
        <>
          <Stack.Screen
            name="PersonAppTab"
            component={PersonAppTabStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonCauseDetails"
            component={CauseDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PersonOngDetails"
            component={OngDetails}
            options={{
              headerShown: false,
            }}
            sharedElements={(route, otherRoute, showing) => {
              const { id } = route.params;
              return [
                {
                  id: `item.${id}.photo`,
                },
                {
                  id: `item.${id}.name`,
                  animation: 'fade-in',
                },
                {
                  id: `item.${id}.address`,
                },
                {
                  id: `item.${id}.description`,
                },
              ];
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="PersonInitial" component={Initial} options={{ headerShown: false }} />
          <Stack.Screen name="PersonSignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="PersonSignIn" component={SignIn} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}
