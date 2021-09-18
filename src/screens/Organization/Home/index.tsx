import React, { useEffect } from 'react';
import { Text } from '@atoms/Text';

import { Container } from './styles';
import { useAuth } from '@hooks/useAuth';

export function Home() {
  const { clearAuthData } = useAuth();

  return (
    <Container>
      <Text>teste</Text>
    </Container>
  );
}
