import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { FooterText } from '@molecules/FooterText';
import { SectionHeader } from '@molecules/SectionHeader';
import { FormSignIn } from '@organisms/Forms/FormSignIn';

import { api } from '@services/api';
import { RootNavigatorParamsList } from '@routes/types';

import { Container, Header } from './styles';

type SignInScreenNavigationProp = StackNavigationProp<RootNavigatorParamsList, 'OrganizationStack'>;

interface Data {
  email: string;
  password: string;
}

export function SignInTemplate() {
  const { t } = useTranslation();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const handleLogin = async (data: Data) => {
    try {
      await api.post('/auth/organization/login', data);
      navigation.navigate('OrganizationStack', { screen: 'AppStack', params: { screen: 'Home' } });
    } catch (error) {
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
