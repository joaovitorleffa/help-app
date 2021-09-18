import React, { useState } from 'react';
import axios from 'axios';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';
import { RootNavigatorParamsList } from '@routes/types';

import { Text } from '@atoms/Text';
import { FooterText } from '@molecules/FooterText';
import { SectionHeader } from '@molecules/SectionHeader';
import { FormSignIn } from '@organisms/Forms/FormSignIn';

import { Container, Header } from './styles';

type SignInScreenNavigationProp = StackNavigationProp<RootNavigatorParamsList, 'OrganizationStack'>;

interface Data {
  email: string;
  password: string;
}

export function SignInTemplate() {
  const { t } = useTranslation();
  const rem = useRem();
  const theme = useTheme();
  const { setOrganizationData } = useAuth();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const [isInvalid, setIsInvalid] = useState(false);

  const handleLogin = async (data: Data) => {
    try {
      const response = await api.post('/auth/organization/login', data);
      await setOrganizationData({
        organizationData: response.data.organization,
        userData: response.data.user,
        accessToken: response.data.accessToken,
      });
      navigation.navigate('OrganizationStack', { screen: 'AppStack', params: { screen: 'Home' } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status) {
          setIsInvalid(true);
        }
      }
      console.log('[handleLogin] error:', error);
    }
  };

  const onSubmit = (data: Data) => {
    handleLogin(data);
  };

  const goToSignUp = () => {
    navigation.navigate('OrganizationStack', {
      screen: 'AuthStack',
      params: { screen: 'SignUpFirstStep' },
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Container>
        <Header>
          <SectionHeader title={t('sign_in.welcome')} subtitle={t('sign_in.subtitle')} isDark />
          {isInvalid && (
            <Text fontSize={rem(0.8)} color={theme.colors.error} style={{ marginTop: rem(1.2) }}>
              {t('sign_in.invalid_login')}
            </Text>
          )}
        </Header>
        <FormSignIn onSignIn={onSubmit} />

        <FooterText
          text={t('sign_in.no_have_account')}
          touchable={t('common.register')}
          onTouch={goToSignUp}
        />
      </Container>
    </KeyboardAvoidingView>
  );
}
