import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

interface ContainerProps {
  size: 'sm' | 'md';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${({ theme, size }) => theme.screen.rem(size === 'md' ? 2.8 : 1.6)}px;
  height: ${({ theme, size }) => theme.screen.rem(size === 'md' ? 2.8 : 1.6)}px;
  border-radius: ${({ theme }) => theme.screen.rem(2.8)}px;
  background-color: ${({ theme }) => theme.colors.secondary};

  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.screen.rem(1.2)}px;
`;

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;
