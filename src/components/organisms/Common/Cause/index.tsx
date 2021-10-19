import React from 'react';
import { format, isAfter } from 'date-fns';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CauseDto } from '@dto/cause-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { Text } from '@atoms/Text';
import { CauseType } from '@molecules/CauseType';
import { CauseHeader } from '@molecules/CauseHeader';

import { Container, Footer } from './styles';

interface CauseProps {
  cause: CauseDto;
  onEdit: (cause: UpdateCauseDto) => void;
}

export function Cause({ cause, onEdit }: CauseProps): JSX.Element {
  const { t } = useTranslation();
  const rem = useRem();
  const theme = useTheme();

  const handlePress = () => {
    onEdit(cause);
  };

  const ended = !isAfter(new Date(cause.endAt), new Date());

  return (
    <Container onPress={handlePress} ended={ended}>
      <CauseHeader title={cause.title} description={cause.description} />
      <Footer>
        <CauseType type={t(`common.${cause.type}`)} variant={ended ? 'danger' : 'success'} />
        <Text fontSize={rem(theme.fonts.size.sm)} color={theme.colors.text} fontFamily="medium">
          {format(new Date(cause.endAt), 'dd/MM/yyyy')}
        </Text>
      </Footer>
    </Container>
  );
}
