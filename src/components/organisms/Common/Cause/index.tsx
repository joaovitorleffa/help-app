import React from 'react';
import { format, isAfter } from 'date-fns';

import { CauseDto } from '@dto/cause-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { CauseHeader } from '@molecules/CauseHeader';
import { CauseFooter } from '@molecules/CauseFooter';

import { Container } from './styles';

interface CauseProps {
  cause: CauseDto;
  onPress: (cause: UpdateCauseDto) => void;
}

export function Cause({ cause, onPress }: CauseProps): JSX.Element {
  const handlePress = () => {
    onPress(cause);
  };

  const ended = !isAfter(new Date(cause.endAt), new Date());

  return (
    <Container onPress={handlePress} ended={ended}>
      <CauseHeader title={cause.title} description={cause.description} />
      <CauseFooter
        ended={ended}
        endAt={format(new Date(cause.endAt), 'dd/MM/yyyy')}
        type={cause.type}
      />
    </Container>
  );
}
