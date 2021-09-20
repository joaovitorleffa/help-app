import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';

interface ButtonProps {
  isFocused: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  height: ${({ theme }) => theme.screen.rem(4) + getBottomSpace() / 3}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-top-left-radius: ${({ theme }) => theme.screen.rem(2)}px;
  border-top-right-radius: ${({ theme }) => theme.screen.rem(2)}px;
  justify-content: center;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  height: ${({ theme }) => theme.screen.rem(2.4)}px;
  width: ${({ theme }) => theme.screen.rem(2.4)}px;
  border-radius: ${({ theme }) => theme.screen.rem(2.4)}px;

  align-items: center;
  justify-content: center;
  margin: 0px 12px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      background-color: ${theme.colors.primary};
    `}
`;
