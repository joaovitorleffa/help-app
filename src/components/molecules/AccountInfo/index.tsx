import { Text } from '@atoms/Text';
import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Container, Icon, Row } from './styles';

interface AccountInfoProps {
  name: string;
  email: string;
  onLogout: () => void;
}

export function AccountInfo({ name, email, onLogout }: AccountInfoProps) {
  const theme = useTheme();
  const rem = useRem();
  return (
    <Container>
      <Row>
        <Text fontSize={rem(1.34)} fontFamily="bold">
          {name}
        </Text>
        <BorderlessButton onPress={onLogout}>
          <Icon name="logout-variant" />
        </BorderlessButton>
      </Row>
      <Text fontSize={rem(0.8)} fontFamily="bold">
        {email}
      </Text>
    </Container>
  );
}
