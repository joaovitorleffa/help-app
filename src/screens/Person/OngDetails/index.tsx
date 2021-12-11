import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { RouteProp, useRoute } from '@react-navigation/core';
import { SharedElement } from 'react-navigation-shared-element';

import { Text } from '@atoms/Text';
import { PersonNavigatorParamsList } from '@routes/types';

import { Container, Content, Header, Photo, Wrapper, Icon } from './styles';

type OngDetailsRouteProp = RouteProp<PersonNavigatorParamsList, 'PersonOngDetails'>;

export function OngDetails(): JSX.Element {
  const theme = useTheme();
  const rem = useRem();
  const route = useRoute<OngDetailsRouteProp>();
  const { id, image, name, address, description, phone, cep } = route.params;

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
          <Text fontSize={rem(theme.fonts.size.sm)} fontFamily="medium">
            CEP: {cep}
          </Text>
          {!!phone && (
            <Text fontSize={rem(theme.fonts.size.sm)} fontFamily="medium">
              Telefone: {phone}
            </Text>
          )}
        </Header>

        {!!description === true ? (
          <Text fontSize={rem(theme.fonts.size.sm)}>{description}</Text>
        ) : (
          <Text fontSize={rem(theme.fonts.size.sm)}>A ONG não cadastrou nenhuma descrição.</Text>
        )}
      </Content>
    </Container>
  );
}
