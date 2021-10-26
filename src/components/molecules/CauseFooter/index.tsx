import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CauseEnum } from '@dto/cause-dto';

import { Text } from '@atoms/Text';
import { CauseType as Type } from '@molecules/CauseType';

import { Container } from './styles';

interface CauseFooterProps {
  type: CauseEnum;
  ended: boolean;
  endAt: string;
}

export function CauseFooter({ ended, endAt, type }: CauseFooterProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Container>
      <Type type={t(`common.${type}`)} variant={ended ? 'danger' : 'success'} />
      <Text fontSize={rem(theme.fonts.size.sm)} color={theme.colors.text} fontFamily="medium">
        {endAt}
      </Text>
    </Container>
  );
}
