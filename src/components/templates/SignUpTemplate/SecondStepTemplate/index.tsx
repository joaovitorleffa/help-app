import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { OrganizationAuthNavigatorParamsList } from '@routes/types';

import { FormSteps } from '@molecules/Form/FormSteps';
import { SectionHeader } from '@molecules/SectionHeader';
import { SignUpSecondStep } from '@organisms/Forms/Organization/SignUpSecondStep';

import { Container, Header, Wrapper } from './styles';
import { SecondStepData } from '@dto/sign-up-dto';

type SecondStepNavigationScreenProp = StackNavigationProp<
  OrganizationAuthNavigatorParamsList,
  'SignUpSecondStep'
>;

type SecondStepRouteProp = RouteProp<OrganizationAuthNavigatorParamsList, 'SignUpSecondStep'>;

export function SecondStepTemplate() {
  const { t } = useTranslation();
  const navigation = useNavigation<SecondStepNavigationScreenProp>();
  const route = useRoute<SecondStepRouteProp>();

  const { params } = route;

  const handleNextStep = (data: SecondStepData) => {
    navigation.navigate('SignUpThirdStep', { ...data, ...params });
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <FormSteps steps={3} currentStep={2} />

            <Wrapper>
              <SectionHeader
                title={t('sign_up.create_title')}
                subtitle={t('sign_up.create_message')}
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
