import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { Text } from '../../atoms/Text';

import { Container } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
  textColor?: string;
}

export function Button({ title, textColor, color, ...rest }: ButtonProps) {
  const theme = useTheme();
  const rem = useRem();

  return (
    <Container {...rest} color={color}>
      <Text color={textColor ?? theme.colors.title} fontSize={rem(1)} fontFamily="medium">
        {title}
      </Text>
    </Container>
  );
}
