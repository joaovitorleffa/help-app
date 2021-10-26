import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Icon = styled(MaterialIcons)`
  font-size: ${({ theme }) => theme.screen.rem(1.2)}px;
  color: ${({ theme }) => theme.colors.title};
`;
