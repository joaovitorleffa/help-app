import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.screen.rem(0.7)}px;
  margin-bottom: ${({ theme }) => theme.screen.rem(0.7)}px;
`;

export const Icon = styled(Entypo)`
  font-size: ${({ theme }) => theme.screen.rem(1.4)}px;
  color: ${({ theme }) => theme.colors.title};
`;
