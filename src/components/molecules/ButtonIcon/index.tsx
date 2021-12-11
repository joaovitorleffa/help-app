import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Text } from '@atoms/Text';

import { Container, Icon, EmptyView } from './styles';
import { View } from 'react-native';

interface ButtonIconProps extends RectButtonProps {
  title: string;
  color?: string;
  textColor?: string;
  onPress: () => void;
}

export function ButtonIcon({ title, textColor, color, ...rest }: ButtonIconProps) {
  const theme = useTheme();
  const rem = useRem();

  return (
    <Container {...rest} activeOpacity={0.75} color={color} underlayColor={theme.colors.underlay}>
      <EmptyView />
      <Text color={textColor ?? theme.colors.title} fontSize={rem(1)} fontFamily="medium">
        {title}
      </Text>
      <Icon name="chevron-right" />
    </Container>
  );
}
