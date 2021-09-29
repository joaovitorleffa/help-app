import React from 'react';
import { useTranslation } from 'react-i18next';

import { CauseDto } from '@dto/cause-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { CauseType } from '@molecules/CauseType';
import { CauseHeader } from '@molecules/CauseHeader';

import { Container, Footer } from './styles';
import { Text } from '@atoms/Text';
import { format } from 'date-fns';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

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

  return (
    <Container onPress={handlePress}>
      <CauseHeader title={cause.title} description={cause.description} />
      <Footer>
        <CauseType type={t(`common.${cause.type}`)} />
        <Text fontSize={rem(theme.fonts.size.sm)} color={theme.colors.text}>
          {format(new Date(cause.endAt), 'dd/MM/yyyy')}
        </Text>
      </Footer>
    </Container>
  );
}
