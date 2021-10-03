import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.error_50};
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px;
  border-radius: 4px;
`;

export const Icon = styled(Feather)`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.screen.rem(1)}px;
  color: ${({ theme }) => theme.colors.error};
`;
