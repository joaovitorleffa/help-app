import React from 'react';
import { useRem } from 'responsive-native';

import { Text } from '../../atoms/Text';

import { Container, Icon } from './styles';

interface FormStepsProps {
  steps: number;
  currentStep: number;
}

export function FormSteps({ currentStep, steps }: FormStepsProps) {
  const rem = useRem();
  return (
    <Container>
      <Icon name="chevron-left" />
      <Text fontFamily="medium" fontSize={rem(1.2)}>
        {currentStep}/{steps}
      </Text>
    </Container>
  );
}
