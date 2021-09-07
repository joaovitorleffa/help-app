import React from 'react';
import { View } from 'react-native';

import { FooterText } from '../../../molecules/FooterText';
import { FormSteps } from '../../../molecules/FormSteps';
import { SectionHeader } from '../../../molecules/SectionHeader';
import { FormSignIn } from '../../../organisms/Forms/FormSignIn';
import { SignUpFirstStep } from '../../../organisms/Forms/Organization/SignUpFirstStep';

import { Container, Content, Header, Wrapper } from './styles';

export function FirstStepTemplate() {
  return (
    <Container>
      <Content>
        <Header>
          <FormSteps steps={3} currentStep={1} />
          <Wrapper>
            <SectionHeader
              title="Crie uma conta!"
              subtitle="Preencha os dados para continuar!"
              isDark
            />
          </Wrapper>
        </Header>
        <SignUpFirstStep />
        <FooterText text="Eu já tenho uma conta," touchable="Entrar" onTouch={() => {}} />
      </Content>
    </Container>
  );
}
