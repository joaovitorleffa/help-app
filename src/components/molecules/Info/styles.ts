import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { InfoStyle } from './info.style.type';

export const Container = styled.View<InfoStyle>`
  background-color: ${({ theme, variant }) =>
    variant === 'info'
      ? theme.colors.primary
      : variant === 'success'
      ? theme.colors.success_50
      : theme.colors.error_50};
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px;
  border-radius: 4px;
`;

export const Icon = styled(Feather)<InfoStyle>`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.screen.rem(1)}px;
  color: ${({ theme, variant }) =>
    variant === 'info'
      ? theme.colors.title_secondary
      : variant === 'success'
      ? theme.colors.success
      : theme.colors.error};
`;
