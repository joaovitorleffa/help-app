import React from 'react';
import LottieView from 'lottie-react-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootNavigatorParamsList } from '@routes/types';
import GreetingAnimation from '@assets/animations/greeting.json';

import { Button } from '@molecules/Button';
import { SectionHeader } from '@molecules/SectionHeader';

import { Container, Footer, Wrapper } from './styles';

type GreetingsNavigationScreenProps = StackNavigationProp<RootNavigatorParamsList, 'Greeting'>;

export function Greetings(): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<GreetingsNavigationScreenProps>();

  const handleRegisterOng = () => {
    navigation.navigate('OrganizationStack', {
      screen: 'AuthStack',
      params: { screen: 'Initial' },
    });
  };

  const handleHelpOng = () => {
    navigation.navigate('PersonStack', { screen: 'PersonInitial' });
  };

  return (
    <Container>
      <SectionHeader isDark title="Help." subtitle={t('greetings.subtitle')} />
      <LottieView
        source={GreetingAnimation}
        style={{ height: 300, alignSelf: 'center' }}
        speed={0.75}
        autoPlay
        loop
      />
      <Footer>
        <Button
          title={t('greetings.register_a_ong')}
          color={theme.colors.primary}
          textColor={theme.colors.title_secondary}
          onPress={handleRegisterOng}
        />
        <Wrapper>
          <Button
            title={t('greetings.help_a_ong')}
            color={theme.colors.primary}
            textColor={theme.colors.title_secondary}
            onPress={handleHelpOng}
          />
        </Wrapper>
      </Footer>
    </Container>
  );
}
