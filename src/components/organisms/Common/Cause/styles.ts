import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  height: ${({ theme }) => theme.screen.rem(8)}px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.screen.rem(1.35)}px;
  justify-content: space-between;
  padding: 16px 20px;
`;
