import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '@atoms/Text';
import { Input } from '@molecules/Input';
import { Button } from '@molecules/Button';

import { Container, Wrapper, Row, ButtonWrapper } from './styles';

interface SignUpSecondStepProps {
  handleNextStep: () => void;
}

export function SignUpSecondStep({ handleNextStep }: SignUpSecondStepProps) {
  const rem = useRem();
  const theme = useTheme();
  return (
    <Container>
      <Row>
        <Input placeholder="CEP" width="48%" />
        <Input placeholder="Número" width="48%" />
      </Row>
      <Wrapper>
        <Input placeholder="Bairro" />
      </Wrapper>
      <Text fontFamily="regular">Horário de atendimento</Text>

      <Row style={{ marginTop: rem(0.4) }}>
        <Input placeholder="Início" width="48%" />
        <Input placeholder="Fim" width="48%" />
      </Row>

      <ButtonWrapper>
        <Button
          title="Próximo"
          color={theme.colors.primary}
          textColor={theme.colors.title_secondary}
          onPress={handleNextStep}
        />
      </ButtonWrapper>
    </Container>
  );
}
