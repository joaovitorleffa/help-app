import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { FirstStepData } from 'src/dto/sign-up-dto';
import { OrganizationAuthNavigatorParamsList } from '@routes/types';

import { FooterText } from '@molecules/FooterText';
import { FormSteps } from '@molecules/Form/FormSteps';
import { SectionHeader } from '@molecules/SectionHeader';
import { SignUpFirstStep } from '@organisms/Forms/Organization/SignUpFirstStep';

import { Container, Header, Wrapper } from './styles';

type FirstStepNavigationScreenProp = StackNavigationProp<
  OrganizationAuthNavigatorParamsList,
  'SignUpFirstStep'
>;

export function FirstStepTemplate() {
  const { t } = useTranslation();
  const navigation = useNavigation<FirstStepNavigationScreenProp>();

  const handleNextStep = (data: FirstStepData) => {
    navigation.navigate('SignUpSecondStep', data);
  };

  const goToSignIn = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <FormSteps steps={3} currentStep={1} />
            <Wrapper>
              <SectionHeader
                title={t('sign_up.create_title')}
                subtitle={t('sign_up.create_message')}
                isDark
              />
            </Wrapper>
          </Header>
          <SignUpFirstStep handleNextStep={handleNextStep} />
          <FooterText text="Eu já tenho uma conta," touchable="Entrar" onTouch={goToSignIn} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
