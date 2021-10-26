import React from 'react';
import { format, isAfter } from 'date-fns';

import { AllCausesDto } from '@dto/cause-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { CauseFooter } from '@molecules/CauseFooter';
import { CauseHeader } from '@molecules/CauseHeader';

import { Container } from './styles';

interface CauseSecondaryProps {
  cause: AllCausesDto;
  onPress: (cause: UpdateCauseDto) => void;
}

export function CauseSecondary({ cause, onPress }: CauseSecondaryProps): JSX.Element {
  const handlePress = () => {
    onPress(cause);
  };

  const ended = !isAfter(new Date(cause.endAt), new Date());

  return (
    <Container onPress={handlePress} ended={ended}>
      <CauseHeader
        ong={cause.organization.name}
        title={cause.title}
        description={cause.description}
      />
      <CauseFooter
        ended={ended}
        endAt={format(new Date(cause.endAt), 'dd/MM/yyyy')}
        type={cause.type}
      />
    </Container>
  );
}
