import React from 'react';

import { CommentBalloon } from '@molecules/CommentBalloon';
import { RoundedAvatar } from '@molecules/RoundedAvatar';

import { Container } from './styles';

interface CommentProps {
  name: string;
  comment: string;
  photoUri?: string | null;
  isOwner: boolean;
}

export function Comment({ name, comment, photoUri, isOwner }: CommentProps): JSX.Element {
  return (
    <Container>
      <RoundedAvatar uri={photoUri} />
      <CommentBalloon name={name} comment={comment} isOwner={isOwner} />
    </Container>
  );
}
