import React, { useCallback } from 'react';

import { ProfileInfo } from '@templates/Organization/ProfileInfo';

import { Container } from './styles';
import { useAuth } from '@hooks/useAuth';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  useNavigation,
} from '@react-navigation/core';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { OrganizationAppNavigatorParamsList, OrganizationNavigatorParamsList } from '@routes/types';
import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type OrganizationProfileNavigationScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<OrganizationAppNavigatorParamsList, 'Home'>,
  StackNavigationProp<OrganizationNavigatorParamsList>
>;

export function Profile() {
  const navigation = useNavigation<OrganizationProfileNavigationScreenProp>();
  const { organization, user, clearAuthData } = useAuth();

  const onLogout = useCallback(async () => {
    await clearAuthData();
    navigation.replace('AuthStack', { screen: 'Initial' });
  }, []);

  return (
    <Container>
      <ProfileInfo name={organization.name} email={user.email} onLogout={onLogout} />
    </Container>
  );
}
