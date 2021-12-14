import React from 'react';
import { RootNavigatorParamsList } from '@routes/types';
import { RouteProp, useRoute } from '@react-navigation/core';
import FastImage from 'react-native-fast-image';

import { Container } from './styles';
import { Dimensions, ScrollView } from 'react-native';

type ImageViewerRouteProps = RouteProp<RootNavigatorParamsList, 'ImageViewer'>;

export function ImageViewer(): JSX.Element {
  const route = useRoute<ImageViewerRouteProps>();
  const { images, selectedIndex } = route.params;

  return (
    <Container>
      <ScrollView horizontal>
        {images.map((element) => (
          <FastImage
            key={element}
            source={{ uri: element }}
            resizeMode="contain"
            style={{
              backgroundColor: '#000',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
          />
        ))}
      </ScrollView>
    </Container>
  );
}
