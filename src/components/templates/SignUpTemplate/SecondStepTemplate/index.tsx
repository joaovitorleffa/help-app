import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { OrganizationAuthNavigatorParamsList } from '@routes/types';

import { FormSteps } from '@molecules/FormSteps';
import { SectionHeader } from '@molecules/SectionHeader';
import { SignUpSecondStep } from '@organisms/Forms/Organization/SignUpSecondStep';

import { Container, Header, Wrapper } from './styles';

type SecondStepNavigationScreenProp = StackNavigationProp<
  OrganizationAuthNavigatorParamsList,
  'SignUpSecondStep'
>;

export function SecondStepTemplate() {
  const navigation = useNavigation<SecondStepNavigationScreenProp>();

  const handleNextStep = () => {
    navigation.navigate('SignUpThirdStep');
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <FormSteps steps={3} currentStep={2} />

            <Wrapper>
              <SectionHeader
                title="Crie uma conta!"
                subtitle="Preencha os dados para continuar!"
                isDark
              />
            </Wrapper>
          </Header>
          <SignUpSecondStep handleNextStep={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
