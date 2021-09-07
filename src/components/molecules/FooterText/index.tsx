import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '../../atoms/Text';

import { Container } from './styles';

interface FooterTextProps {
  text: string;
  touchable: string;
  onTouch: () => void;
}

export function FooterText({ text, touchable, onTouch }: FooterTextProps) {
  const theme = useTheme();
  const rem = useRem();
  return (
    <Container>
      <Text color={theme.colors.title} fontSize={rem(0.8)}>
        {text}{' '}
        <Text
          color={theme.colors.primary}
          fontSize={rem(0.8)}
          fontFamily="medium"
          onPress={onTouch}>
          {touchable}
        </Text>
      </Text>
    </Container>
  );
}
