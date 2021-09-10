import React from 'react';
import LottieView from 'lottie-react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootNavigatorParamsList } from '@routes/types';
import GreetingAnimation from '../../assets/animations/greeting.json';

import { Button } from '@molecules/Button';
import { SectionHeader } from '@molecules/SectionHeader';

import { Container, Footer, Wrapper } from './styles';

type GreetingsNavigationScreenProps = StackNavigationProp<RootNavigatorParamsList, 'Greeting'>;

export function Greetings() {
  const theme = useTheme();
  const navigation = useNavigation<GreetingsNavigationScreenProps>();

  const handleRegisterOng = () => {
    navigation.navigate('OrganizationStack', {
      screen: 'AuthStack',
      params: { screen: 'Initial' },
    });
  };

  const handleHelpOng = () => {
    // navigation.navigate('PersonStack');
  };

  return (
    <Container>
      <SectionHeader
        isDark
        title="Help."
        subtitle={`Seja bem-vindo (a),\nAjude a transformar vidas!`}
      />
      <LottieView
        source={GreetingAnimation}
        style={{ height: 300, alignSelf: 'center' }}
        speed={0.75}
        autoPlay
        loop
      />
      <Footer>
        <Button
          title="Cadastrar uma ONG"
          color={theme.colors.primary}
          textColor={theme.colors.title_secondary}
          onPress={handleRegisterOng}
        />
        <Wrapper>
          <Button
            title="Ajudar uma ONG"
            color={theme.colors.primary}
            textColor={theme.colors.title_secondary}
            onPress={handleHelpOng}
          />
        </Wrapper>
      </Footer>
    </Container>
  );
}
