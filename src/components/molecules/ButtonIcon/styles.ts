import { RectButton } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import styled from 'styled-components/native';

type ContainerProps = {
  color?: string;
};

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  height: ${({ theme }) => theme.screen.rem(2.8)}px;
  background-color: ${({ theme, color }) => color ?? theme.colors.background};
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  flex-direction: row;
  justify-content: space-between;
  padding: 0px ${({ theme }) => theme.screen.rem(0.4)}px;
`;

export const EmptyView = styled.View`
  width: ${({ theme }) => theme.screen.rem(1.4)}px;
`;

export const Icon = styled(Entypo)`
  font-size: ${({ theme }) => theme.screen.rem(1.4)}px;
  color: ${({ theme }) => theme.colors.background};
`;
