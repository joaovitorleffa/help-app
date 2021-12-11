import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRem } from 'responsive-native';

import { Text } from '@atoms/Text';

import { Container, Icon } from './styles';

interface FormStepsProps {
  steps: number;
  currentStep: number;
}

export function FormSteps({ currentStep, steps }: FormStepsProps): JSX.Element {
  const rem = useRem();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <BorderlessButton onPress={handleGoBack}>
        <Icon name="chevron-left" />
      </BorderlessButton>

      <Text fontFamily="medium" fontSize={rem(1.2)}>
        {currentStep}/{steps}
      </Text>
    </Container>
  );
}
