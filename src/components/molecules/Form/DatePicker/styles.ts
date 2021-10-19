import styled, { css } from 'styled-components/native';

type ContentProps = {
  error?: boolean;
};

export const Container = styled.TouchableOpacity<ContentProps>`
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
`;
