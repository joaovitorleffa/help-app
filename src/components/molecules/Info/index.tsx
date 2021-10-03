import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '@atoms/Text';

import { Container, Icon } from './styles';

interface InfoProps {
  text: string;
}

export function Info({ text }: InfoProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();

  return (
    <Container>
      <Icon name="info" />
      <Text
        color={theme.colors.error}
        fontSize={rem(theme.fonts.size.sm)}
        style={{ flex: 1, marginLeft: 8 }}>
        {text}
      </Text>
    </Container>
  );
}
