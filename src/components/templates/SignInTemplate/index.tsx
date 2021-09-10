import React from 'react';

import { FooterText } from '@molecules/FooterText';
import { SectionHeader } from '@molecules/SectionHeader';
import { FormSignIn } from '@organisms/Forms/FormSignIn';

import { Container, Content } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { OrganizationAuthNavigatorParamsList } from '@routes/types';
import { useNavigation } from '@react-navigation/core';

type SignInScreenNavigationProp = StackNavigationProp<
  OrganizationAuthNavigatorParamsList,
  'SignIn'
>;

export function SignInTemplate() {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const goToSignUp = () => {
    navigation.navigate('SignUpFirstStep');
  };

  return (
    <Container>
      <Content>
        <SectionHeader title="Bem-vindo," subtitle="Entre para continuar!" isDark />
        <FormSignIn />
        <FooterText text="Eu não tenho uma conta," touchable="Cadastrar" onTouch={goToSignUp} />
      </Content>
    </Container>
  );
}
