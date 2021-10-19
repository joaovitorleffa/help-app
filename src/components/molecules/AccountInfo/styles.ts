import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled.View``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${({ theme }) => theme.screen.rem(0.2)}px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => theme.screen.rem(1.4)}px;
  color: ${({ theme }) => theme.colors.title};
`;
