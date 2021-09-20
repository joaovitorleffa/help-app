import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '@atoms/Text';

import { Container, Wrapper, Icon, Photo } from './styles';

interface BannerProps {
  uri?: string;
  showContent?: boolean;
  onSelectImage: () => void;
}

export function Banner({ uri, showContent = true, onSelectImage }: BannerProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  return (
    <Container onPress={onSelectImage} activeOpacity={0.65}>
      {uri ? (
        <Photo source={{ uri }} />
      ) : (
        <Wrapper>
          {showContent && (
            <>
              <Icon name="image-edit" />
              <Text fontSize={rem(theme.fonts.size.xs)}>Clique para escolher uma imagem</Text>
            </>
          )}
        </Wrapper>
      )}
    </Container>
  );
}
