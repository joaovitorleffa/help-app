import React, { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useFocusEffect, useNavigation } from '@react-navigation/core';

import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';
import { OrganizationDto } from '@dto/organization-dto';
import { OrganizationAppNavigatorParamsList, OrganizationNavigatorParamsList } from '@routes/types';

import { FloatButton } from '@molecules/FloatButton';
import { ProfileInfo } from '@templates/Organization/ProfileInfo';

import { Container } from './styles';

type OrganizationProfileNavigationScreenProp = CompositeNavigationProp<
  BottomTabNavigationProp<OrganizationAppNavigatorParamsList, 'Profile'>,
  StackNavigationProp<OrganizationNavigatorParamsList>
>;

export function Profile(): JSX.Element {
  const navigation = useNavigation<OrganizationProfileNavigationScreenProp>();
  const { t } = useTranslation();
  const { organization, user, clearAuthData } = useAuth();

  const [profile, setProfile] = useState({} as OrganizationDto);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrganizationProfile = useCallback(async () => {
    try {
      const { data } = await api.get<OrganizationDto>('organizations/profile');
      setProfile(data);
    } catch (error) {
      console.log('[fetchOrganizationProfile]: ', error);
      showMessage({
        message: t('common.error'),
        description: t('errors.load_profile_error'),
        type: 'danger',
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [t]);

  const handleLogout = useCallback(async () => {
    await clearAuthData();
    navigation.replace('AuthStack', { screen: 'Initial' });
  }, [navigation, clearAuthData]);

  const handleEdit = useCallback(() => {
    navigation.navigate('EditProfile', {
      profileImage: profile.profileImage,
      description: profile.description,
    });
  }, [navigation, profile]);

  useFocusEffect(
    useCallback(() => {
      fetchOrganizationProfile();
    }, [fetchOrganizationProfile]),
  );

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
