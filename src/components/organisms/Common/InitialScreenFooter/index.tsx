import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { OrganizationAuthNavigatorParamsList } from '@routes/types';

import { Button } from '@molecules/Button';

import { Container, Wrapper } from './styles';

type InitialScreenNavigationProp = StackNavigationProp<
  OrganizationAuthNavigatorParamsList,
  'Initial'
>;

export function InitialScreenFooter(): JSX.Element {
  const { t } = useTranslation();
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
        <Button title={t('common.entry')} onPress={handleSignIn} />
      </Wrapper>
      <Button title={t('common.register')} onPress={handleSignUp} />
    </Container>
  );
}
