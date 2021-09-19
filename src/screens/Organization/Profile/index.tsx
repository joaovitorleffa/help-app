import React, { useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { OrganizationAppNavigatorParamsList, OrganizationNavigatorParamsList } from '@routes/types';

import { useAuth } from '@hooks/useAuth';

import { FloatButton } from '@molecules/FloatButton';
import { ProfileInfo } from '@templates/Organization/ProfileInfo';

import { Container } from './styles';

type OrganizationProfileNavigationScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<OrganizationAppNavigatorParamsList, 'Home'>,
  StackNavigationProp<OrganizationNavigatorParamsList>
>;

export function Profile() {
  const navigation = useNavigation<OrganizationProfileNavigationScreenProp>();
  const { organization, user, clearAuthData } = useAuth();

  const handleLogout = useCallback(async () => {
    await clearAuthData();
    navigation.replace('AuthStack', { screen: 'Initial' });
  }, []);

  const handleEdit = useCallback(() => {
    navigation.navigate('EditProfile');
  }, []);

  return (
    <Container>
      <ProfileInfo name={organization.name} email={user.email} onLogout={handleLogout} />
      <FloatButton icon="mode-edit" onPress={handleEdit} />
    </Container>
  );
}
