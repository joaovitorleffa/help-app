import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

type PageProps = {
  isActive?: boolean;
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Page = styled(RectButton)<PageProps>`
  align-items: center;
  justify-content: center;

  width: ${({ theme }) => theme.screen.rem(2)}px;
  height: ${({ theme }) => theme.screen.rem(2)}px;
  border-radius: 4px;
  margin-right: 8px;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.secondary_50};
`;
