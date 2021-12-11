import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Icon = styled(Entypo)`
  font-size: ${({ theme }) => theme.screen.rem(1.4)}px;
  color: ${({ theme }) => theme.colors.title};
`;
