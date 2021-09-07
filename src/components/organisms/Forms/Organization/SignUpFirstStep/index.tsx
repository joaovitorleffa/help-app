import React from 'react';
import { useTheme } from 'styled-components';

import { Button } from '../../../../molecules/Button';
import { Input } from '../../../../molecules/Input';

import { Container, Wrapper, ButtonWrapper } from './styles';

export function SignUpFirstStep() {
  const theme = useTheme();
  return (
    <Container>
      <Input placeholder="Nome" />
      <Wrapper>
        <Input placeholder="E-mail" />
      </Wrapper>
      <Input placeholder="Nº de WhatsApp" />
      <ButtonWrapper>
        <Button
          title="Próximo"
          color={theme.colors.primary}
          textColor={theme.colors.title_secondary}
        />
      </ButtonWrapper>
    </Container>
  );
}
