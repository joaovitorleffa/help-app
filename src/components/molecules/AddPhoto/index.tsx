import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon } from './styles';

export function AddPhoto({ ...rest }: RectButtonProps): JSX.Element {
  return (
    <Container {...rest}>
      <Icon name="plus" />
    </Container>
  );
}
