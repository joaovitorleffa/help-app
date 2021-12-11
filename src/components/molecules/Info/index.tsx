import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '@atoms/Text';
import { InfoStyle } from './info.style.type';

import { Container, Icon } from './styles';

interface InfoProps extends InfoStyle {
  text: string;
}

export function Info({ text, variant = 'error' }: InfoProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();

  return (
    <Container variant={variant}>
      <Icon name="info" variant={variant} />
      <Text
        color={
          variant === 'info'
            ? theme.colors.title_secondary
            : variant === 'success'
            ? theme.colors.success_50
            : theme.colors.error
        }
        fontSize={rem(theme.fonts.size.xs)}
        style={{ flex: 1, marginLeft: 8 }}>
        {text}
      </Text>
    </Container>
  );
}
