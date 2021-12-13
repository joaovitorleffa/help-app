import React from 'react';
import { useRem } from 'responsive-native';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from 'styled-components';
import { showMessage } from 'react-native-flash-message';
import { RouteProp, useRoute } from '@react-navigation/core';
import { SharedElement } from 'react-navigation-shared-element';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text } from '@atoms/Text';
import { PersonNavigatorParamsList } from '@routes/types';

import { Container, Content, Header, Photo, Wrapper, Icon } from './styles';

type OngDetailsRouteProp = RouteProp<PersonNavigatorParamsList, 'PersonOngDetails'>;

export function OngDetails(): JSX.Element {
  const theme = useTheme();
  const rem = useRem();
  const route = useRoute<OngDetailsRouteProp>();
  const { id, image, name, email, address, description, phone } = route.params;

  const copyToClipboard = () => {
    Clipboard.setString(phone);
    showMessage({ message: 'Copiado para a área de transferências! 📎', type: 'info' });
  };

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
            Email: {email}
          </Text>
          {!!phone && (
            <TouchableOpacity onPress={copyToClipboard}>
              <Text fontSize={rem(theme.fonts.size.sm)} fontFamily="medium">
                Telefone:{' '}
                <Text
                  fontSize={rem(theme.fonts.size.sm)}
                  fontFamily="medium"
                  color={theme.colors.primary}>
                  {phone}
                </Text>
              </Text>
            </TouchableOpacity>
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
