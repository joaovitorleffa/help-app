import React from 'react';
import { useTranslation } from 'react-i18next';

import { CauseDto } from '@dto/cause-dto';

import { CauseType } from '@molecules/CauseType';
import { CauseHeader } from '@molecules/CauseHeader';

import { Container } from './styles';

interface CauseProps {
  cause: CauseDto;
  onPressCause: () => void;
}

export function Cause({ cause, onPressCause }: CauseProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Container onPress={onPressCause}>
      <CauseHeader title={cause.title} description={cause.description} />
      <CauseType type={t(`common.${cause.type}`)} />
    </Container>
  );
}
