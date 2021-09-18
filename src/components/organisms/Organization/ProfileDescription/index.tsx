import React from 'react';

import { AccountInfo } from '@molecules/AccountInfo';

import { Container } from './styles';

interface ProfileDescriptionProps {
  name: string;
  email: string;
  onLogout: () => void;
}

export function ProfileDescription({ name, email, onLogout }: ProfileDescriptionProps) {
  return (
    <Container>
      <AccountInfo name={name} email={email} onLogout={onLogout} />
    </Container>
  );
}
