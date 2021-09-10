import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { FormSteps } from '@molecules/FormSteps';
import { SectionHeader } from '@molecules/SectionHeader';
import { SignUpThirdStep } from '@organisms/Forms/Organization/SignUpThirdStep';

import { Container, Header, Wrapper } from './styles';

export function ThirdStepTemplate() {
  const handleNextStep = () => {};

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <FormSteps steps={3} currentStep={3} />

            <Wrapper>
              <SectionHeader
                title="Crie uma conta!"
                subtitle="Preencha os dados para continuar!"
                isDark
              />
            </Wrapper>
          </Header>
          <SignUpThirdStep handleNextStep={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
