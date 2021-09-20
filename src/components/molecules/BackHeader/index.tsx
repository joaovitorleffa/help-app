import { Text } from '@atoms/Text';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Container, Icon } from './styles';

interface BackHeaderProps {
  title: string;
  isDark?: boolean;
}

export function BackHeader({ title, isDark = false }: BackHeaderProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation?.goBack();
  };

  return (
    <Container>
      <BorderlessButton onPress={handleGoBack}>
        <Icon name="chevron-left" />
      </BorderlessButton>
      <Text
        style={{ marginLeft: 12 }}
        color={theme.colors[isDark ? 'title_secondary' : 'title']}
        fontSize={rem(theme.fonts.size.lg)}
        fontFamily="bold">
        {title}
      </Text>
    </Container>
  );
}
