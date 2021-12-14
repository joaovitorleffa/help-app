import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

export const Container = styled.TouchableOpacity`
  width: ${({ theme }) => theme.screen.rem(3)}px;
  height: ${({ theme }) => theme.screen.rem(3)}px;
  border-radius: ${({ theme }) => theme.screen.rem(0.4)}px;
  background-color: ${({ theme }) => theme.colors.secondary};

  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.screen.rem(1.4)}px;
`;

export const ProfileImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`;
