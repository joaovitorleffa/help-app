import React from 'react';
import { useTheme } from 'styled-components';

import { Button } from '@molecules/Button';
import { Input } from '@molecules/Input';

import { Container, Wrapper } from './styles';

export function FormSignIn() {
  const theme = useTheme();
  return (
    <Container>
      <Input placeholder="E-mail" />
      <Wrapper>
        <Input placeholder="Senha" />
      </Wrapper>
      <Button
        title="Entrar"
        color={theme.colors.primary}
        textColor={theme.colors.title_secondary}
      />
    </Container>
  );
}
