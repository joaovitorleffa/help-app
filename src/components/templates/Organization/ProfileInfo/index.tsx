import React from 'react';

import { ProfileDescription } from '@organisms/Organization/ProfileDescription';

import { Container } from './styles';

interface ProfileInfoProps {
  name: string;
  email: string;
  onLogout: () => void;
}

export function ProfileInfo({ name, email, onLogout }: ProfileInfoProps) {
  return (
    <Container>
      <ProfileDescription name={name} email={email} onLogout={onLogout} />
    </Container>
  );
}
