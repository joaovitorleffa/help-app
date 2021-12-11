import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Text } from '@atoms/Text';

import { Container } from './styles';
import { ActivityIndicator } from 'react-native';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  textColor?: string;
  onPress: () => void;
  isLoading?: boolean;
}

export function Button({ title, textColor, color, isLoading, ...rest }: ButtonProps): JSX.Element {
  const theme = useTheme();
  const rem = useRem();

  return (
    <Container {...rest} activeOpacity={0.75} color={color} underlayColor={theme.colors.underlay}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.title_secondary} />
      ) : (
        <Text
          color={textColor ?? theme.colors.title}
          fontSize={rem(theme.fonts.size.sm)}
          fontFamily="medium">
          {title}
        </Text>
      )}
    </Container>
  );
}
