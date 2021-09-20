import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components/native';
import { Text } from '@atoms/Text';

import { Container } from './styles';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  isDark?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  isDark = false,
}: SectionHeaderProps): JSX.Element {
  const theme = useTheme();
  const rem = useRem();
  return (
    <Container>
      <Text
        color={theme.colors[isDark ? 'title' : 'title_secondary']}
        fontSize={rem(2)}
        fontFamily="bold">
        {title}
      </Text>
      <Text
        color={theme.colors[isDark ? 'title' : 'title_secondary']}
        fontSize={rem(1)}
        fontFamily="regular">
        {subtitle}
      </Text>
    </Container>
  );
}
