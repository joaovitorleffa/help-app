import React from 'react';
import LottieView from 'lottie-react-native';

import CheckAnimation from '../../assets/animations/check.json';

import { Container, TextWrapper } from './styles';
import { Text } from '@atoms/Text';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {
  OrganizationAuthNavigatorParamsList,
  PersonNavigatorParamsList,
  RootNavigatorParamsList,
} from '@routes/types';
import { useRem } from 'responsive-native';
import { Button } from '@molecules/Button';
import { useTheme } from 'styled-components';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type SuccessScreenProp = RouteProp<RootNavigatorParamsList, 'Success'>;

type SuccessNavigationScreeProp = StackNavigationProp<RootNavigatorParamsList, 'Success'>;

export function Success() {
  const rem = useRem();
  const theme = useTheme();
  const route = useRoute<SuccessScreenProp>();
  const navigation = useNavigation<SuccessNavigationScreeProp>();

  const { title, text } = route.params;

  const handleContinue = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <View>
        <LottieView
          source={CheckAnimation}
          style={{ height: 300, alignSelf: 'center' }}
          speed={0.75}
          autoPlay
          loop={false}
        />
        <Text fontFamily="bold" textAlign="center">
          {title}
        </Text>
        <TextWrapper>
          <Text fontSize={rem(0.8)} textAlign="center">
            {text}
          </Text>
        </TextWrapper>
      </View>
      <Button
        title="Continuar"
        onPress={handleContinue}
        color={theme.colors.success}
        textColor={theme.colors.title_secondary}
      />
    </Container>
  );
}
