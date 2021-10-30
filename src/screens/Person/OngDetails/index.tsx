import { Text } from '@atoms/Text';
import { RouteProp, useRoute } from '@react-navigation/core';
import { PersonNavigatorParamsList } from '@routes/types';
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Container, Content, Header, Photo, Wrapper, Icon } from './styles';

type OngDetailsRouteProp = RouteProp<PersonNavigatorParamsList, 'PersonOngDetails'>;

export function OngDetails(): JSX.Element {
  const theme = useTheme();
  const rem = useRem();
  const route = useRoute<OngDetailsRouteProp>();
  const { id, image, name, address, description } = route.params;

  return (
    <Container>
      <SharedElement id={`item.${id}.photo`}>
        {image ? (
          <Photo source={{ uri: image }} />
        ) : (
          <Wrapper>
            <Icon name="image" />
          </Wrapper>
        )}
      </SharedElement>

      <Content>
        <Header>
          <Text fontFamily="bold">{name}</Text>

          <Text fontSize={rem(theme.fonts.size.sm)} fontFamily="medium">
            {address}
          </Text>
        </Header>

        <Text fontSize={rem(theme.fonts.size.sm)}>{description}</Text>
      </Content>
    </Container>
  );
}
