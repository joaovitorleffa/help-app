import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '@atoms/Text';

import { Container } from './styles';

interface CauseTypeProps {
  type: string;
}

export function CauseType({ type }: CauseTypeProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();

  return (
    <Container>
      <Text
        color={theme.colors.title_secondary}
        fontSize={rem(theme.fonts.size.xs)}
        fontFamily="bold">
        {type}
      </Text>
    </Container>
  );
}
