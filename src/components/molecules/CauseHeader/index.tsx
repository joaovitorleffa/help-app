import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Text } from '@atoms/Text';

import { Container, Header, Icon } from './styles';

interface CauseHeaderProps {
  title: string;
  ong: string;
  description: string;
  isFavorite?: boolean;
  removeOption: boolean;
  isLoading?: boolean;
  onFavorite?: () => void;
}

export function CauseHeader({
  title,
  ong,
  description,
  onFavorite,
  removeOption,
  isLoading = false,
  isFavorite = false,
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
          {ong && (
            <Text color={theme.colors.title} fontFamily="bold" fontSize={rem(theme.fonts.size.sm)}>
              {ong}
            </Text>
          )}
        </View>
        {isLoading ? (
          <ActivityIndicator color={theme.colors.title} />
        ) : (
          <>
            {onFavorite && (
              <BorderlessButton onPress={onFavorite}>
                {removeOption ? (
                  <Icon name="close" isFavorite={isFavorite} />
                ) : isFavorite ? (
                  <Icon name="favorite" isFavorite={isFavorite} />
                ) : (
                  <Icon name="favorite-border" />
                )}
              </BorderlessButton>
            )}
          </>
        )}
      </Header>
      <Text numberOfLines={2} fontSize={rem(theme.fonts.size.xs)} color={theme.colors.text}>
        {description}
      </Text>
    </Container>
  );
}
