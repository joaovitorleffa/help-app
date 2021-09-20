import React from 'react';

import { ProfileBanner } from '@organisms/Organization/ProfileBanner';
import { ProfileDescription } from '@organisms/Organization/ProfileDescription';

import { Container, Wrapper } from './styles';
import SkeletonContent from 'react-native-skeleton-content';
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
      <SkeletonContent
        isLoading={isLoading}
        containerStyle={{ width: '100%' }}
        layout={[{ key: '1', width: '100%', height: 300 }]}>
        <ProfileBanner uri={uri} />
      </SkeletonContent>
      <SkeletonContent
        isLoading={isLoading}
        containerStyle={{ width: '100%' }}
        layout={[
          {
            key: '1',
            width: '40%',
            height: rem(theme.fonts.size.xl),
            marginTop: 24,
            marginHorizontal: theme.spacing.grid,
          },
          {
            key: '2',
            width: '60%',
            height: rem(theme.fonts.size.lg),
            marginTop: 12,
            marginHorizontal: theme.spacing.grid,
          },
          {
            key: '3',
            width: '60%',
            height: rem(theme.fonts.size.md),
            marginTop: 24,
            marginHorizontal: theme.spacing.grid,
          },
          {
            key: '4',
            width: '70%',
            height: rem(theme.fonts.size.md),
            marginTop: 6,
            marginHorizontal: theme.spacing.grid,
          },
          {
            key: '5',
            width: '80%',
            height: rem(theme.fonts.size.md),
            marginTop: 6,
            marginHorizontal: theme.spacing.grid,
          },
        ]}>
        <Wrapper>
          <ProfileDescription
            name={name}
            email={email}
            description={description}
            onLogout={onLogout}
          />
        </Wrapper>
      </SkeletonContent>
    </Container>
  );
}
