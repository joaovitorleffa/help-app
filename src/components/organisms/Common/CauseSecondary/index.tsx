import React from 'react';
import { format, isAfter } from 'date-fns';

import { AllCausesDto } from '@dto/cause-dto';

import { CauseFooter } from '@molecules/CauseFooter';
import { CauseHeader } from '@molecules/CauseHeader';

import { Container } from './styles';
import { useMutation, useQueryClient } from 'react-query';
import { updateFavoriteCause } from '@services/person/cause.api';

interface CauseSecondaryProps {
  cause: AllCausesDto;
  removeOption?: boolean;
  onPress: (cause: AllCausesDto) => void;
}

export function CauseSecondary({ cause, removeOption, onPress }: CauseSecondaryProps): JSX.Element {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateFavoriteCause, {
    onSuccess: () => {
      queryClient.invalidateQueries('allCauses');
      queryClient.invalidateQueries('personFavoriteCauses');
    },
  });
  const handlePress = () => {
    onPress(cause);
  };

  const onFavorite = () => {
    if (removeOption) {
      return mutate({ ...cause, isFavorite: false });
    }
    mutate({ ...cause, isFavorite: !cause.isFavorite });
  };

  const ended = !isAfter(new Date(cause.endAt), new Date());

  return (
    <Container onPress={handlePress} ended={ended}>
      <CauseHeader
        ong={cause.organization.name}
        title={cause.title}
        isFavorite={cause.isFavorite}
        onFavorite={onFavorite}
        removeOption={!!removeOption}
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
