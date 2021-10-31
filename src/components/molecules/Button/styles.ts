import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

type ContainerProps = {
  color?: string;
};

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  height: ${({ theme }) => theme.screen.rem(2.6)}px;
  background-color: ${({ theme, color }) => color ?? theme.colors.button};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;
