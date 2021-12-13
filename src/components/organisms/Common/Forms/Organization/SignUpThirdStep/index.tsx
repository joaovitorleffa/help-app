import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import i18n from '@assets/locales/i18n';
import { ThirdStepData } from '@dto/sign-up-dto';
import { useSignUpSteps } from '@hooks/useSignUpSteps';

import { Button } from '@molecules/Button';
import { InputForm } from '@molecules/Form/InputForm';

import { ButtonWrapper, Container, Wrapper } from './styles';

interface SignUpThirdStepProps {
  isLoading: boolean;
  handleNextStep: (data: ThirdStepData) => void;
}

const schema = Yup.object().shape({
  password: Yup.string().required(i18n.t('errors.fill_password')).min(6, 'errors.min_password'),
  passwordConfirm: Yup.string().required(i18n.t('errors.fill_confirm_password')),
});

export function SignUpThirdStep({ handleNextStep, isLoading }: SignUpThirdStepProps): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation();
  const { formData, serializeFormData } = useSignUpSteps();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const onSubmit = (data: ThirdStepData) => {
    serializeFormData(data);
    handleNextStep(data);
  };

  useEffect(() => {
    if (password !== passwordConfirm) {
      setError('passwordConfirm', {
        type: 'manual',
        message: i18n.t('errors.different_passwords'),
      });
    } else {
      clearErrors();
    }
  }, [passwordConfirm]);

  return (
    <Container>
      <InputForm
        control={control}
        name="password"
        error={errors.password && errors.password.message}
        placeholder={t('common.password')}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        defaultValue={formData?.password}
      />

      <Wrapper>
        <InputForm
          control={control}
          name="passwordConfirm"
          error={errors.passwordConfirm && errors.passwordConfirm.message}
          placeholder={t('common.confirm_password')}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          defaultValue={formData?.confirmPassword}
        />
      </Wrapper>
      <ButtonWrapper>
        <Button
          isLoading={isLoading}
          title="Cadastrar"
          color={theme.colors.button}
          textColor={theme.colors.title_secondary}
          onPress={handleSubmit(onSubmit)}
        />
      </ButtonWrapper>
    </Container>
  );
}
