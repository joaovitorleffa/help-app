import React from 'react';
import { useTheme } from 'styled-components';
import * as Google from 'expo-google-app-auth';
import { LinearGradient } from 'expo-linear-gradient';

import { InitialScreen } from '@templates/Common/InitialScreen';

import { Container, Content, Footer, Wrapper } from './styles';
import { SectionHeader } from '@molecules/SectionHeader';
import { Button } from '@molecules/Button';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { PersonNavigatorParamsList } from '@routes/types';

type InitialScreenNavigationProp = StackNavigationProp<PersonNavigatorParamsList, 'PersonInitial'>;

export function Initial(): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<InitialScreenNavigationProp>();

  const handleSignIn = () => navigation.navigate('PersonSignIn');

  const handleSignUp = () => navigation.navigate('PersonSignUp');

  return (
    <Container>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primary_100, theme.colors.primary_200]}
        style={{ flex: 1 }}>
        <Content>
          <SectionHeader title="Help." subtitle={t('greetings.help_peoples')} />
          <Footer>
            <Wrapper>
              <Button title={t('common.entry')} onPress={handleSignIn} />
            </Wrapper>
            <Button title={t('common.register')} onPress={handleSignUp} />
          </Footer>
        </Content>
      </LinearGradient>
    </Container>
  );
}
