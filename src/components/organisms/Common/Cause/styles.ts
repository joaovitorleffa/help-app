import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ContainerProps {
  ended: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  height: ${({ theme }) => theme.screen.rem(8)}px;
  background-color: ${({ theme, ended }) =>
    ended ? theme.colors.error_50 : theme.colors.success_50};
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.screen.rem(1.35)}px;
  justify-content: space-between;
  padding: 16px 20px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
