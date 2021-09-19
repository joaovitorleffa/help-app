import styled, { css } from 'styled-components/native';

type TextAreaProps = {
  isFocused: boolean;
  error?: boolean;
};

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  margin-bottom: 38px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Wrapper = styled.View`
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
`;

export const BannerContainer = styled.View`
  margin-top: 24px;
`;

export const TextArea = styled.TextInput<TextAreaProps>`
  text-align-vertical: top;
  padding: 4px 0px;
  color: ${({ theme }) => theme.colors.text};
  border-color: ${({ theme }) => theme.colors.placeholder};
  font-size: ${({ theme }) => theme.screen.rem(theme.fonts.size.sm)}px;

  ${({ isFocused }) =>
    !isFocused &&
    css`
      border-bottom-width: 2px;
    `};

  ${({ error }) =>
    error &&
    css`
      color: ${({ theme }) => theme.colors.error};
      border-color: ${({ theme }) => theme.colors.error};
    `};
`;
