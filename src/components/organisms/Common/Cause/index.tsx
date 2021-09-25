import React from 'react';
import { useTranslation } from 'react-i18next';

import { CauseDto } from '@dto/cause-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { CauseType } from '@molecules/CauseType';
import { CauseHeader } from '@molecules/CauseHeader';

import { Container } from './styles';

interface CauseProps {
  cause: CauseDto;
  onEdit: (cause: UpdateCauseDto) => void;
}

export function Cause({ cause, onEdit }: CauseProps): JSX.Element {
  const { t } = useTranslation();

  const handlePress = () => {
    onEdit(cause);
  };

  return (
    <Container onPress={handlePress}>
      <CauseHeader title={cause.title} description={cause.description} />
      <CauseType type={t(`common.${cause.type}`)} />
    </Container>
  );
}
