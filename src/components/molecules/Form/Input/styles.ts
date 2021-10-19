import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

type ContentProps = {
  isFocused: boolean;
  error?: boolean;
  width?: string | number;
};

export const Content = styled(TextInput)<ContentProps>`
  background-color: ${({ theme }) => theme.colors.gray};
  padding: ${({ theme }) => theme.screen.rem(0.8)}px;
  font-size: ${({ theme }) => theme.screen.rem(0.8)}px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  border-width: 1px;

  border-color: ${({ theme }) => theme.colors.gray_50};

  ${({ theme, error }) =>
    error &&
    css`
      border-color: ${theme.colors.error};
      background-color: ${theme.colors.error_50};
    `}

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-color: ${theme.colors.primary_100};
      background-color: ${theme.colors.primary_50};
      color: ${theme.colors.title_secondary};
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${typeof width === 'number' ? `${width}px` : width};
    `}
`;
