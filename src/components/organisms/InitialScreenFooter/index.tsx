import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { OrganizationAuthNavigatorParamsList } from '../../../routes/types';

import { Button } from '../../molecules/Button';

import { Container, Wrapper } from './styles';

type InitialScreenNavigationProp = StackNavigationProp<
  OrganizationAuthNavigatorParamsList,
  'Initial'
>;

export function InitialScreenFooter() {
  const navigation = useNavigation<InitialScreenNavigationProp>();

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpFirstStep');
  };

  return (
    <Container>
      <Wrapper>
        <Button title="Entrar" onPress={handleSignIn} />
      </Wrapper>
      <Button title="Cadastrar" onPress={handleSignUp} />
    </Container>
  );
}
