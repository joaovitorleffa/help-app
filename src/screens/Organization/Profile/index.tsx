import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';

import { useAuth } from '@hooks/useAuth';
import { OrganizationAppNavigatorParamsList, OrganizationNavigatorParamsList } from '@routes/types';

import { FloatButton } from '@molecules/FloatButton';
import { ProfileInfo } from '@templates/Organization/ProfileInfo';

import { Container } from './styles';
import { useQuery } from 'react-query';
import { getProfile } from '@services/organization';

type OrganizationProfileNavigationScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<OrganizationAppNavigatorParamsList, 'Profile'>,
  StackNavigationProp<OrganizationNavigatorParamsList>
>;

export function Profile(): JSX.Element {
  const navigation = useNavigation<OrganizationProfileNavigationScreenProp>();
  const { t } = useTranslation();
  const { organization, user, clearAuthData } = useAuth();

  const { data: profile, isLoading, isError } = useQuery('organization-profile', getProfile);

  useEffect(() => {
    if (isError) {
      showMessage({
        message: t('common.error'),
        description: t('errors.load_profile_error'),
        type: 'danger',
      });
    }
  }, [isError, t]);

  const handleLogout = useCallback(async () => {
    await clearAuthData();
    navigation.replace('AuthStack', { screen: 'Initial' });
  }, [navigation, clearAuthData]);

  const handleEdit = useCallback(() => {
    if (profile) {
      navigation.navigate('EditProfile', {
        profileImage: profile.profileImage,
        description: profile.description,
      });
    }
  }, [navigation, profile]);

  return (
    <Container>
      <ProfileInfo
        isLoading={isLoading}
        name={organization.name}
        email={user.email}
        uri={profile?.profileImage ?? ''}
        description={profile?.description ?? ''}
        onLogout={handleLogout}
      />
      <FloatButton icon="mode-edit" onPress={handleEdit} />
    </Container>
  );
}
