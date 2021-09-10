import React from 'react';
import { useTheme } from 'styled-components';

import { Button } from '@molecules/Button';
import { Input } from '@molecules/Input';

import { ButtonWrapper, Container, Wrapper } from './styles';

interface SignUpThirdStepProps {
  handleNextStep: () => void;
}

export function SignUpThirdStep({ handleNextStep }: SignUpThirdStepProps) {
  const theme = useTheme();
  return (
    <Container>
      <Input placeholder="Senha" />
      <Wrapper>
        <Input placeholder="Confirmar senha" />
      </Wrapper>
      <ButtonWrapper>
        <Button
          title="Cadastrar"
          color={theme.colors.primary}
          textColor={theme.colors.title_secondary}
          onPress={handleNextStep}
        />
      </ButtonWrapper>
    </Container>
  );
}
