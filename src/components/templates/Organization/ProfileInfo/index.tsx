import React from 'react';

import { ProfileBanner } from '@organisms/Organization/ProfileBanner';
import { ProfileDescription } from '@organisms/Organization/ProfileDescription';

import { Container, Wrapper } from './styles';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

interface ProfileInfoProps {
  name: string;
  email: string;
  uri: string;
  description: string;
  onLogout: () => void;
  isLoading?: boolean;
}

export function ProfileInfo({
  name,
  email,
  uri,
  description,
  onLogout,
  isLoading = false,
}: ProfileInfoProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();

  return (
    <Container>
      <ProfileBanner uri={uri} />

      <Wrapper>
        <ProfileDescription
          name={name}
          email={email}
          description={description}
          onLogout={onLogout}
        />
      </Wrapper>
    </Container>
  );
}
