import React from 'react';
import { Dimensions, Image } from 'react-native';

import { Container } from './styles';

export function ProfileBanner() {
  return (
    <Container>
      <Image
        style={{ width: Dimensions.get('window').width, height: 300 }}
        source={{
          uri: 'https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
        }}
      />
    </Container>
  );
}
