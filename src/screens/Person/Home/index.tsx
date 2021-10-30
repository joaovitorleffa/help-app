import React from 'react';
import { Text } from '@atoms/Text';
import { useAuth } from '@hooks/useAuth';
import { Button } from 'react-native';

import { Container } from './styles';

export function Home(): JSX.Element {
  const { clearAuthData } = useAuth();

  const handleLogout = async () => {
    await clearAuthData();
  };

  return (
    <Container>
      <Button title="Sair" onPress={handleLogout} />
      <Text>Home person</Text>
    </Container>
  );
}
