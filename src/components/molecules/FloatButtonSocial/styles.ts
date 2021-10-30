import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.View`
  position: absolute;
  right: ${({ theme }) => theme.spacing.grid}px;
  bottom: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const FloatBtn = styled(RectButton)`
  width: ${({ theme }) => theme.screen.rem(3)}px;
  height: ${({ theme }) => theme.screen.rem(3)}px;
  border-radius: ${({ theme }) => theme.screen.rem(1.5)}px;
  background-color: ${({ theme }) => theme.colors.success};

  align-items: center;
  justify-content: center;
`;

export const Icon = styled(FontAwesome)`
  font-size: ${({ theme }) => theme.screen.rem(1.3)}px;
  color: ${({ theme }) => theme.colors.title_secondary};
`;
