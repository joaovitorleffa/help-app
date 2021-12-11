import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

interface IconProps {
  isFavorite: boolean;
}

export const Container = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Icon = styled(MaterialIcons)<IconProps>`
  font-size: ${({ theme }) => theme.screen.rem(1.2)}px;
  color: ${({ theme, isFavorite }) => (isFavorite ? theme.colors.primary : theme.colors.title)};
`;
