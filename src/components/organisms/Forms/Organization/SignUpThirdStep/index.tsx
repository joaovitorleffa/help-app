import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Button } from '@molecules/Button';
import { Input } from '@molecules/Form/Input';

import { ButtonWrapper, Container, Wrapper } from './styles';
import { InputForm } from '@molecules/Form/InputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThirdStepData } from '@dto/sign-up-dto';

interface SignUpThirdStepProps {
  handleNextStep: (data: ThirdStepData) => void;
}

const schema = Yup.object().shape({
  password: Yup.string()
    .required('A senha é obrigatória!')
    .min(6, 'A senha deve ter ao menos 6 caracteres!'),
  passwordConfirm: Yup.string().required('Confirme a senha!'),
});

export function SignUpThirdStep({ handleNextStep }: SignUpThirdStepProps) {
  const theme = useTheme();

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
    handleNextStep(data);
  };

  useEffect(() => {
    if (password !== passwordConfirm) {
      setError('passwordConfirm', { type: 'manual', message: 'As senhas não coincidem!' });
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
        placeholder="Senha"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />

      <Wrapper>
        <InputForm
          control={control}
          name="passwordConfirm"
          error={errors.passwordConfirm && errors.passwordConfirm.message}
          placeholder="Confirmar senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </Wrapper>
      <ButtonWrapper>
        <Button
          title="Cadastrar"
          color={theme.colors.primary}
          textColor={theme.colors.title_secondary}
          onPress={handleSubmit(onSubmit)}
        />
      </ButtonWrapper>
    </Container>
  );
}
