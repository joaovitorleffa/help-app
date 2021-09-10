import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Text } from '@atoms/Text';

import { Container } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  textColor?: string;
}

export function Button({ title, textColor, color, ...rest }: ButtonProps) {
  const theme = useTheme();
  const rem = useRem();

  return (
    <Container {...rest} activeOpacity={0.75} color={color} underlayColor={theme.colors.primary_50}>
      <Text color={textColor ?? theme.colors.title} fontSize={rem(1)} fontFamily="medium">
        {title}
      </Text>
    </Container>
  );
}
