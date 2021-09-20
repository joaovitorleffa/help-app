import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '@atoms/Text';

import { Container, Wrapper, Icon, Photo } from './styles';

interface ProfileBannerProps {
  uri: string;
}

export function ProfileBanner({ uri }: ProfileBannerProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();

  return (
    <Container>
      {!uri ? (
        <Wrapper>
          <Icon name="image" />
          <Text fontSize={rem(theme.fonts.size.xs)}>Sua imagem de capara irá aparecer aqui</Text>
        </Wrapper>
      ) : (
        <Photo source={{ uri }} />
      )}
    </Container>
  );
}
