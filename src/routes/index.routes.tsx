import React from 'react';
import { useTheme } from 'styled-components';
import { Host } from 'react-native-portalize';
import { ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '@hooks/useAuth';
import { UserTypeEnum } from '@dto/user-dto';
import { RootNavigatorParamsList } from './types';
import { useSwitchTheme } from '@hooks/useSwitchTheme';

import { Success } from '@screens/Common/Success';
import { Comments } from '@screens/Common/Comments';
import { PersonRoutes } from './person/index.routes';
import { Greetings } from '@screens/Common/Greetings';
import { ImageViewer } from '@screens/Common/ImageViewer';
import { OrganizationRoutes } from './organization/index.routes';
import axios from 'axios';
import { api } from '@services/api';

const Stack = createStackNavigator<RootNavigatorParamsList>();

export function Routes(): JSX.Element {
  const { user, isLoading, accessToken, clearAuthData } = useAuth();
  const theme = useTheme();
  const { checked: isDark } = useSwitchTheme();

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        clearAuthData();
      }
      return Promise.reject(error);
    },
  );

  if (isLoading) return <ActivityIndicator color={theme.colors.primary} />;

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.secondary,
          text: theme.colors.text,
          border: theme.colors.primary,
          notification: theme.colors.primary,
        },
      }}>
      <StatusBar barStyle={theme.bar.style} backgroundColor={theme.colors.primary} />
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
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
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen name="ImageViewer" component={ImageViewer} />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
}
