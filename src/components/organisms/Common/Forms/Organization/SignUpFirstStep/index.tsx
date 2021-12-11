import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import i18n from '@assets/locales/i18n';
import { FirstStepData } from '@dto/sign-up-dto';
import { useSignUpSteps } from '@hooks/useSignUpSteps';
import { phoneNumberMask, removeSpecialCharacters } from '@utils/mask';

import { ButtonIcon } from '@molecules/ButtonIcon';
import { InputForm } from '@molecules/Form/InputForm';

import { Container, Wrapper, ButtonWrapper } from './styles';

interface SignUpFirstStepProps {
  handleNextStep: (data: FirstStepData) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required(i18n.t('errors.fill_name')),
  email: Yup.string().required(i18n.t('errors.fill_email')).email(i18n.t('errors.invalid_email')),
  phoneNumber: Yup.string()
    .required(i18n.t('errors.fill_phone_number'))
    .transform(removeSpecialCharacters)
    .min(10, i18n.t('errors.invalid_phone_number2'))
    .max(11, i18n.t('errors.invalid_phone_number')),
});

export function SignUpFirstStep({ handleNextStep }: SignUpFirstStepProps): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation();
  const { formData, serializeFormData } = useSignUpSteps();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: FirstStepData) => {
    serializeFormData(data);
    handleNextStep({ ...data, phoneNumber: '55' + data.phoneNumber.trim() });
  };

  return (
    <Container>
      <InputForm
        name="name"
        control={control}
        error={errors.name && errors.name.message}
        placeholder={t('common.name')}
        autoCapitalize="words"
        defaultValue={formData?.name}
      />

      <Wrapper>
        <InputForm
          name="email"
          control={control}
          error={errors.email && errors.email.message}
          placeholder={t('common.email')}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          defaultValue={formData?.email}
        />
      </Wrapper>
      <InputForm
        name="phoneNumber"
        maxLength={16}
        control={control}
        error={errors.phoneNumber && errors.phoneNumber.message}
        mask={phoneNumberMask}
        placeholder={t('common.whatsapp_number')}
        keyboardType="phone-pad"
        defaultValue={formData?.phoneNumber}
      />
      <ButtonWrapper>
        <ButtonIcon
          title="Próximo"
          color={theme.colors.primary}
          textColor={theme.colors.title_secondary}
          onPress={handleSubmit(onSubmit)}
        />
      </ButtonWrapper>
    </Container>
  );
}
