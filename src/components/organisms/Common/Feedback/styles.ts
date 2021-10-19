import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View``;

export const Wrapper = styled.View`
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
`;

export const Icon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.screen.rem(theme.fonts.size.md)}px;
`;
