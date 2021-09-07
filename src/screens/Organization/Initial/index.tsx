import React from 'react';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';

import { InitialScreen } from '../../../components/templates/InitialScreen';

import { Container } from './styles';

export function Initial() {
  const theme = useTheme();

  return (
    <Container>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primary_100, theme.colors.primary_200]}
        style={{ flex: 1 }}>
        <InitialScreen title="Help." subtitle={`Cadastre causas para\nque as pessoas ajudem!`} />
      </LinearGradient>
    </Container>
  );
}
