import React from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';

import { InitialScreen } from '@templates/Common/InitialScreen';

import { Container } from './styles';

export function Initial(): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primary_100, theme.colors.primary_200]}
        style={{ flex: 1 }}>
        <InitialScreen title="Help." subtitle={t('initial.subtitle')} />
      </LinearGradient>
    </Container>
  );
}
