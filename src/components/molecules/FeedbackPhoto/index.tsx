import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Photo } from './styles';

interface FeedbackPhotoProps extends TouchableOpacityProps {
  uri?: string;
}

export function FeedbackPhoto({ uri, ...rest }: FeedbackPhotoProps): JSX.Element {
  return (
    <Container activeOpacity={0.65} {...rest}>
      {uri ? <Photo source={{ uri }} /> : <Icon name="image" />}
    </Container>
  );
}
