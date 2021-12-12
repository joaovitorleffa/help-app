import React, { useState } from 'react';
import axios from 'axios';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { CompositeNavigationProp, useNavigation, useRoute } from '@react-navigation/core';

import { FirstStepData, SecondStepData, ThirdStepData } from '@dto/sign-up-dto';
import { OrganizationAuthNavigatorParamsList, RootNavigatorParamsList } from '@routes/types';

import { Text } from '@atoms/Text';
import { FormSteps } from '@molecules/Form/FormSteps';
import { useSignUpSteps } from '@hooks/useSignUpSteps';
import { SectionHeader } from '@molecules/SectionHeader';
import { SignUpThirdStep } from '@organisms/Common/Forms/Organization/SignUpThirdStep';

import { Container, Header, Wrapper, ErrorsWrapper } from './styles';
import { useMutation } from 'react-query';
import { createOrganization } from '@services/organization/auth.api';

type Data = FirstStepData & SecondStepData & ThirdStepData;

type ThirdStepScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootNavigatorParamsList, 'OrganizationStack'>,
  StackNavigationProp<OrganizationAuthNavigatorParamsList>
>;

export function ThirdStepTemplate(): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const route = useRoute();
  const { t } = useTranslation();
  const { clearFormData } = useSignUpSteps();
  const navigation = useNavigation<ThirdStepScreenNavigationProp>();

  const [errors, setErrors] = useState<string[]>([]);

  const { params } = route;

  const { mutate, isLoading } = useMutation(createOrganization, {
    onSuccess: () => {
      clearFormData();
      navigation.replace('Success', {
        title: t('sign_up.sign_up_successfully_title'),
        text: t('sign_up.sign_up_successfully_message'),
      });
    },
    onError: (error) => {
      console.log('[createOrganization] error:', error);
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 400) {
          const errorsMessage = error.response.data.message.map((message: string) => message);
          setErrors(errorsMessage);
        }
      }
    },
  });

  const handleNextStep = (data: ThirdStepData) => {
    !isLoading && mutate({ ...data, ...params } as Data);
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <FormSteps steps={3} currentStep={3} />
            <Wrapper>
              <SectionHeader
                title={t('sign_up.create_title')}
                subtitle={t('sign_up.create_message')}
                isDark
              />
            </Wrapper>
            {!!errors.length && (
              <ErrorsWrapper>
                <Text fontSize={rem(0.8)} color={theme.colors.error}>
                  Ops, parece que alguns dados estão incorretos:
                </Text>
                {errors.map((error) => (
                  <Text key={error} fontSize={rem(0.65)} color={theme.colors.error}>
                    - {t(`errors.${error}`)}
                  </Text>
                ))}
              </ErrorsWrapper>
            )}
          </Header>
          <SignUpThirdStep handleNextStep={handleNextStep} isLoading={isLoading} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
