import React from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Button } from '@molecules/Button';
import { InputForm } from '@molecules/Form/InputForm';

import { Container, Wrapper } from './styles';

interface Data {
  email: string;
  password: string;
}
interface FormSignInProps {
  onSignIn: (data: Data) => void;
  isLoading?: boolean;
}

export function FormSignIn({ onSignIn, isLoading = false }: FormSignInProps): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm();

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
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Wrapper>
      <Button
        title={t('common.entry')}
        isLoading={isLoading}
        color={theme.colors.primary}
        textColor={theme.colors.title_secondary}
        onPress={handleSubmit(onSubmit)}
      />
    </Container>
  );
}
