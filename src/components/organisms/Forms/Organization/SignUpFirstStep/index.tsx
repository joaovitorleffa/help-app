import React from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { ButtonIcon } from '@molecules/ButtonIcon';
import { InputForm } from '@molecules/Form/InputForm';

import { FirstStepData } from 'src/dto/sign-up-dto';

import { phoneNumberMask } from '../../../../../utils/mask';

import { Container, Wrapper, ButtonWrapper } from './styles';

interface SignUpFirstStepProps {
  handleNextStep: (data: FirstStepData) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),
  email: Yup.string().required('O e-mail é obrigatório!').email('E-mail inválido!'),
  phoneNumber: Yup.string()
    .required('O Nº de WhatsApp é obrigatório!')
    .min(11, 'Número inválido!')
    .max(11, 'Número inválido!'),
});

export function SignUpFirstStep({ handleNextStep }: SignUpFirstStepProps) {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: FirstStepData) => {
    handleNextStep(data);
  };

  return (
    <Container>
      <InputForm
        name="name"
        control={control}
        error={errors.name && errors.name.message}
        placeholder="Nome"
        autoCapitalize="words"
      />

      <Wrapper>
        <InputForm
          name="email"
          control={control}
          error={errors.email && errors.email.message}
          placeholder="E-mail"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
      </Wrapper>
      <InputForm
        name="phoneNumber"
        maxLength={16}
        control={control}
        error={errors.phoneNumber && errors.phoneNumber.message}
        mask={phoneNumberMask}
        placeholder="Nº de WhatsApp"
        keyboardType="phone-pad"
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
