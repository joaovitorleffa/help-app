import React from 'react';

import { ProfileBanner } from '@organisms/Organization/ProfileBanner';
import { ProfileDescription } from '@organisms/Organization/ProfileDescription';

import { Container, Wrapper } from './styles';

interface ProfileInfoProps {
  name: string;
  email: string;
  onLogout: () => void;
}

export function ProfileInfo({ name, email, onLogout }: ProfileInfoProps) {
  return (
    <Container>
      <ProfileBanner />
      <Wrapper>
        <ProfileDescription name={name} email={email} onLogout={onLogout} />
      </Wrapper>
    </Container>
  );
}
