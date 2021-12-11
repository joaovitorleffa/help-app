import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Text } from '@atoms/Text';
import { AvatarPhoto } from '@molecules/AvatarPhoto';

import { Container, Icon, Wrapper, Content } from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

interface ProfileDataProps {
  profileImageUri?: string;
  handleLogout: () => void;
  handleSelectProfileImage: () => void;
  name: string;
  email: string;
}

export function ProfileData({
  profileImageUri,
  name,
  email,
  handleSelectProfileImage,
  handleLogout,
}: ProfileDataProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();

  return (
    <Container>
      <Content>
        <AvatarPhoto uri={profileImageUri} onPress={handleSelectProfileImage} />
        <Wrapper>
          <Text fontFamily="bold" color={theme.colors.title}>
            {name}
          </Text>
          <Text fontFamily="bold" fontSize={rem(theme.fonts.size.xs)} color={theme.colors.title}>
            {email}
          </Text>
        </Wrapper>
      </Content>
      <BorderlessButton onPress={handleLogout}>
        <Icon name="logout-variant" />
      </BorderlessButton>
    </Container>
  );
}
