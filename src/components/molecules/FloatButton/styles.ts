import { RectButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const ButtonContainer = styled.View`
  position: absolute;
  right: ${({ theme }) => theme.spacing.grid}px;
  bottom: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const FloatBtn = styled(RectButton)`
  width: ${({ theme }) => theme.screen.rem(3)}px;
  height: ${({ theme }) => theme.screen.rem(3)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.screen.rem(1.5)}px;

  align-items: center;
  justify-content: center;
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${({ theme }) => theme.screen.rem(1.3)}px;
  color: ${({ theme }) => theme.colors.title_secondary};
`;
