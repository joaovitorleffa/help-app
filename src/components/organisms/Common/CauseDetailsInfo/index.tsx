import { Text } from '@atoms/Text';
import { CauseType } from '@molecules/CauseType';
import { format, isBefore } from 'date-fns';
import { isAfter } from 'date-fns/esm';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Container, Footer } from './styles';

interface CauseDetailsInfoProps {
  endAt: string;
  type: 'donation' | 'voluntary_work';
  description: string;
}

export function CauseDetailsInfo({ endAt, type, description }: CauseDetailsInfoProps): JSX.Element {
  const { t } = useTranslation();
  const rem = useRem();
  const theme = useTheme();
  const isEnded = isBefore(new Date(endAt), new Date());

  return (
    <Container>
      <Text
        fontFamily="medium"
        fontSize={rem(theme.fonts.size.sm)}
        color={isEnded ? theme.colors.error : theme.colors.success}
        style={{ marginBottom: rem(0.9) }}>
        {isEnded ? t('common.ended_cause') : t('common.in_progress_cause')}
      </Text>
      <Text fontSize={rem(theme.fonts.size.sm)} color={theme.colors.text}>
        {description}
      </Text>

      <Footer>
        <CauseType type={t(`common.${type}`)} variant={isEnded ? 'danger' : 'success'} />
        <Text fontSize={rem(theme.fonts.size.sm)} fontFamily="medium">
          {format(new Date(endAt), 'dd/MM/yyyy')}
        </Text>
      </Footer>
    </Container>
  );
}
