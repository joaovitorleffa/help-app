import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { OrganizationAuthNavigatorParamsList } from '@routes/types';

import { FooterText } from '@molecules/FooterText';
import { FormSteps } from '@molecules/FormSteps';
import { SectionHeader } from '@molecules/SectionHeader';
import { SignUpFirstStep } from '@organisms/Forms/Organization/SignUpFirstStep';

import { Container, Header, Wrapper } from './styles';

type FirstStepNavigationScreenProp = StackNavigationProp<
  OrganizationAuthNavigatorParamsList,
  'SignUpFirstStep'
>;

export function FirstStepTemplate() {
  const navigation = useNavigation<FirstStepNavigationScreenProp>();

  const handleNextStep = () => {
    navigation.navigate('SignUpSecondStep');
  };

  const goToSignIn = () => {
    navigation.goBack();
  };

  return (
    <>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Container>
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
            <SignUpFirstStep handleNextStep={handleNextStep} />
            <FooterText text="Eu já tenho uma conta," touchable="Entrar" onTouch={goToSignIn} />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
