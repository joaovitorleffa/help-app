import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '@atoms/Text';

import { Container, Header, Icon } from './styles';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { AllCausesDto } from '@dto/cause-dto';

interface CauseHeaderProps {
  title: string;
  ong: string;
  description: string;
  isFavorite?: boolean;
  removeOption: boolean;
  onFavorite?: () => void;
}

export function CauseHeader({
  title,
  ong,
  description,
  onFavorite,
  removeOption,
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
          <Text color={theme.colors.title} fontFamily="bold" fontSize={rem(theme.fonts.size.sm)}>
            {ong}
          </Text>
        </View>
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
      </Header>
      <Text numberOfLines={2} fontSize={rem(theme.fonts.size.xs)} color={theme.colors.text}>
        {description}
      </Text>
    </Container>
  );
}
