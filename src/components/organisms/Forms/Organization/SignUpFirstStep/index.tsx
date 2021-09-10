import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { Input } from '@molecules/Input';
import { Button } from '@molecules/Button';

import { Container, Wrapper, ButtonWrapper } from './styles';
import { phoneNumberMask } from '../../../../../utils/mask';

interface SignUpFirstStepProps {
  handleNextStep: () => void;
}

export function SignUpFirstStep({ handleNextStep }: SignUpFirstStepProps) {
  const theme = useTheme();

  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <Container>
      <Input placeholder="Nome" autoCapitalize="words" />
      <Wrapper>
        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
      </Wrapper>
      <Input
        placeholder="Nº de WhatsApp"
        value={phoneNumberMask(phoneNumber)}
        maxLength={11}
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
      />
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
