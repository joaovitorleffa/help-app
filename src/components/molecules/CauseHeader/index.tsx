import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '@atoms/Text';

import { Container, Header, Icon } from './styles';
import { View } from 'react-native';

interface CauseHeaderProps {
  title: string;
  ong: string;
  description: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
}

export function CauseHeader({
  title,
  ong,
  description,
  isFavorite = false,
  ...rest
}: CauseHeaderProps): JSX.Element {
  const theme = useTheme();
  const rem = useRem();

  return (
    <Container>
      <Header>
        <View>
          <Text color={theme.colors.title} fontFamily="medium">
            {title}
          </Text>
          <Text color={theme.colors.title} fontFamily="bold" fontSize={rem(theme.fonts.size.sm)}>
            {ong}
          </Text>
        </View>
        {rest.onFavorite && <Icon name="favorite-border" />}
      </Header>
      <Text numberOfLines={2} fontSize={rem(theme.fonts.size.xs)} color={theme.colors.text}>
        {description}
      </Text>
    </Container>
  );
}
