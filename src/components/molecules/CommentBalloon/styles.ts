import styled from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 4px 16px;
  border-radius: 6px;
  flex: 1;
  margin-left: 8px;
`;

export const Icon = styled(Octicons)`
  position: absolute;
  left: -7px;
  top: 4px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.secondary};
`;
