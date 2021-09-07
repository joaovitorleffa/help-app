import React from 'react';

import { FooterText } from '../../../components/molecules/FooterText';
import { SectionHeader } from '../../../components/molecules/SectionHeader';
import { FormSignIn } from '../../../components/organisms/Forms/FormSignIn';

import { Container, Content } from './styles';

export function SignInTemplate() {
  return (
    <Container>
      <Content>
        <SectionHeader title="Bem-vindo," subtitle="Entre para continuar!" isDark />
        <FormSignIn />
        <FooterText text="Eu não tenho uma conta," touchable="Cadastrar" onTouch={() => {}} />
      </Content>
    </Container>
  );
}
