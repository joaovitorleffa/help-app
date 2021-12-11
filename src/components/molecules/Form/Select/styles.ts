import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

type ContentProps = {
  error?: boolean;
};

export const Content = styled(TouchableOpacity)<ContentProps>`
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

export const Header = styled.View`
  padding: ${({ theme }) => theme.screen.rem(0.8)}px 0px;
  margin: ${({ theme }) => theme.screen.rem(0.4)}px ${({ theme }) => theme.spacing.grid}px;
`;

export const Item = styled.TouchableOpacity`
  height: ${({ theme }) => theme.screen.rem(2.2)}px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray};
`;

export const ItemWrapper = styled.View`
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled(AntDesign)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.screen.rem(1.2)}px;
`;
