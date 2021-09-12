import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation, useRoute } from '@react-navigation/core';

import { FormSteps } from '@molecules/Form/FormSteps';
import { SectionHeader } from '@molecules/SectionHeader';
import { SignUpThirdStep } from '@organisms/Forms/Organization/SignUpThirdStep';

import { api } from '@services/api';
import { FirstStepData, SecondStepData, ThirdStepData } from '@dto/sign-up-dto';
import { OrganizationAuthNavigatorParamsList, RootNavigatorParamsList } from '@routes/types';

import { Container, Header, Wrapper } from './styles';

type Data = FirstStepData & SecondStepData & ThirdStepData;

type ThirdStepScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootNavigatorParamsList, 'OrganizationStack'>,
  StackNavigationProp<OrganizationAuthNavigatorParamsList>
>;

export function ThirdStepTemplate() {
  const route = useRoute();
  const navigation = useNavigation<ThirdStepScreenNavigationProp>();

  const { params } = route;

  const createOrganization = async (data: Data) => {
    try {
      await api.post('/organizations', data);
      navigation.replace('Success', {
        title: 'Solitação de cadastro enviada',
        text: 'Sua solicatação de cadastro foi enviada para revisão. Confirmaremos seu cadastro em até 48h. Entraremos em contato por E-mail.',
      });
    } catch (error) {
      console.log('[createOrganization] error:', error);
    }
  };

  const handleNextStep = (data: ThirdStepData) => {
    createOrganization({ ...data, ...params } as Data);
  };

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
