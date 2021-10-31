import React from 'react';
import { useTheme } from 'styled-components';
import { Host } from 'react-native-portalize';
import { ActivityIndicator, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '@hooks/useAuth';
import { UserTypeEnum } from '@dto/user-dto';
import { RootNavigatorParamsList } from './types';

import { Success } from '@screens/Common/Success';
import { Greetings } from '@screens/Common/Greetings';
import { ImageViewer } from '@screens/Common/ImageViewer';
import { PersonRoutes } from './person/index.routes';
import { OrganizationRoutes } from './organization/index.routes';

const Stack = createStackNavigator<RootNavigatorParamsList>();

export function Routes(): JSX.Element {
  const { user, isLoading, accessToken } = useAuth();
  const theme = useTheme();

  if (isLoading) return <ActivityIndicator color={theme.colors.primary} />;

  return (
    <NavigationContainer>
      <StatusBar barStyle={theme.bar.style} backgroundColor={theme.colors.primary} />
      <Host>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!!accessToken === false ? (
            <>
              <Stack.Screen name="Greeting" component={Greetings} />
              <Stack.Screen name="OrganizationStack" component={OrganizationRoutes} />
              <Stack.Screen name="PersonStack" component={PersonRoutes} />
            </>
          ) : user.userType === UserTypeEnum.ORGANIZATION ? (
            <Stack.Screen name="OrganizationStack" component={OrganizationRoutes} />
          ) : (
            <Stack.Screen name="PersonStack" component={PersonRoutes} />
          )}
          <Stack.Screen name="Success" component={Success} />
          <Stack.Screen name="ImageViewer" component={ImageViewer} />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
}
