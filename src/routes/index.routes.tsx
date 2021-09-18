import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootNavigatorParamsList } from './types';

import { Success } from '@screens/Success';
import { Greetings } from '@screens/Greetings';
import { OrganizationRoutes } from './organization/index.routes';
import { useAuth } from '@hooks/useAuth';
import { UserTypeEnum } from '@dto/user-dto';
import { PersonRoutes } from './person/index.routes';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

const Stack = createStackNavigator<RootNavigatorParamsList>();

export function Routes() {
  const { user, isLoading } = useAuth();
  const theme = useTheme();

  console.log(isLoading);

  if (isLoading) return <ActivityIndicator color={theme.colors.primary} />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user?.id ? (
          <>
            <Stack.Screen name="Greeting" component={Greetings} />
            <Stack.Screen name="OrganizationStack" component={OrganizationRoutes} />
            <Stack.Screen name="PersonStack" component={OrganizationRoutes} />
          </>
        ) : user.userType === UserTypeEnum.ORGANIZATION ? (
          <Stack.Screen name="OrganizationStack" component={OrganizationRoutes} />
        ) : (
          <Stack.Screen name="PersonStack" component={PersonRoutes} />
        )}
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
