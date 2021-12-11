import React from 'react';
import { useRem } from 'responsive-native';

import { Container, Icon, ProfileImage } from './styles';

interface RoundedAvatar {
  uri?: string | null;
  size?: 'sm' | 'md';
  isDark?: boolean;
}

export function RoundedAvatar({ uri, isDark = false, size = 'md' }: RoundedAvatar): JSX.Element {
  const rem = useRem();

  return (
    <Container activeOpacity={0.6} size={size} isDark={isDark}>
      {uri ? (
        <ProfileImage source={{ uri }} />
      ) : (
        <Icon name="person" size={size === 'md' ? rem(1.2) : rem(0.9)} />
      )}
    </Container>
  );
}
