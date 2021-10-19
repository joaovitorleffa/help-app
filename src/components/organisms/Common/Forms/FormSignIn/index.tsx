import React from 'react';
import { useTheme } from 'styled-components';

import { Button } from '@molecules/Button';
import { InputForm } from '@molecules/Form/InputForm';

import { Container, Wrapper } from './styles';
import { useForm } from 'react-hook-form';

interface Data {
  email: string;
  password: string;
}
interface FormSignInProps {
  onSignIn: (data: Data) => void;
}

export function FormSignIn({ onSignIn }: FormSignInProps) {
  const theme = useTheme();

  const { control, handleSubmit, setError } = useForm();

  const onSubmit = (data: Data) => {
    onSignIn(data);
  };

  return (
    <Container>
      <InputForm
        control={control}
        name="email"
        placeholder="E-mail"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Wrapper>
        <InputForm
          control={control}
          name="password"
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Wrapper>
      <Button
        title="Entrar"
        color={theme.colors.primary}
        textColor={theme.colors.title_secondary}
        onPress={handleSubmit(onSubmit)}
      />
    </Container>
  );
}
