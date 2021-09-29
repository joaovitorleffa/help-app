import { Text } from '@atoms/Text';
import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Container } from './styles';

interface CauseHeaderProps {
  title: string;
  description: string;
}

export function CauseHeader({ title, description }: CauseHeaderProps): JSX.Element {
  const theme = useTheme();
  const rem = useRem();

  return (
    <Container>
      <Text color={theme.colors.title} fontFamily="medium">
        {title}
      </Text>
      <Text numberOfLines={2} fontSize={rem(theme.fonts.size.sm)} color={theme.colors.text}>
        {description}
      </Text>
    </Container>
  );
}
