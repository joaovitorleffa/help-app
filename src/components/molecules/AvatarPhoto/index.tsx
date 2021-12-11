import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, ProfileImage } from './styles';

interface AvatarPhotoProps extends TouchableOpacityProps {
  uri?: string;
}

export function AvatarPhoto({ uri, ...rest }: AvatarPhotoProps): JSX.Element {
  return (
    <Container {...rest} activeOpacity={0.6}>
      {uri ? <ProfileImage source={{ uri }} /> : <Icon name="person" />}
    </Container>
  );
}
