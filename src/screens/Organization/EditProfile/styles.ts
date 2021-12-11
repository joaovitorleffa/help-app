import styled, { css } from 'styled-components/native';

type TextAreaProps = {
  isFocused: boolean;
  error?: boolean;
};

export const Container = styled.View`
  flex: 1;
  padding-bottom: 38px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.SafeAreaView`
  justify-content: space-between;
  flex: 1;
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
  font-size: ${({ theme }) => theme.screen.rem(theme.fonts.size.md)}px;

  ${({ isFocused }) =>
    !isFocused &&
    css`
      border-bottom-width: 1px;
    `};

  ${({ error }) =>
    error &&
    css`
      color: ${({ theme }) => theme.colors.error};
      border-color: ${({ theme }) => theme.colors.error};
    `};
`;
