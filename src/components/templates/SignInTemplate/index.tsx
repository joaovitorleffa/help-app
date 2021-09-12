import React from 'react';
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
    navigation.navigate('SignUpFirstStep');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Container>
        <Header>
          <SectionHeader title="Bem-vindo," subtitle="Entre para continuar!" isDark />
        </Header>
        <FormSignIn onSignIn={onSubmit} />

        <FooterText text="Eu não tenho uma conta," touchable="Cadastrar" onTouch={goToSignUp} />
      </Container>
    </KeyboardAvoidingView>
  );
}
