import React from 'react';
import { useRem } from 'responsive-native';

import { Text } from '@atoms/Text';
import { AccountInfo } from '@molecules/AccountInfo';

import { Container, Wrapper } from './styles';

interface ProfileDescriptionProps {
  name: string;
  email: string;
  onLogout: () => void;
}

export function ProfileDescription({ name, email, onLogout }: ProfileDescriptionProps) {
  const rem = useRem();
  return (
    <Container>
      <AccountInfo name={name} email={email} onLogout={onLogout} />
      <Wrapper>
        <Text fontSize={rem(0.8)}>Sua descrição aparecerá aqui...</Text>
      </Wrapper>
    </Container>
  );
}
