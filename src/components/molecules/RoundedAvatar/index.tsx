import React from 'react';

import { Container, Icon, ProfileImage } from './styles';

interface RoundedAvatar {
  uri?: string | null;
  size?: 'sm' | 'md';
}

export function RoundedAvatar({ uri, size = 'md' }: RoundedAvatar): JSX.Element {
  return (
    <Container activeOpacity={0.6} size={size}>
      {uri ? <ProfileImage source={{ uri }} /> : <Icon name="person" />}
    </Container>
  );
}
