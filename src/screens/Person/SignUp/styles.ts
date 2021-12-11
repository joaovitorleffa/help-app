import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding-left: ${({ theme }) => theme.spacing.grid}px;
  padding-right: ${({ theme }) => theme.spacing.grid}px;
`;

export const Content = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  margin-bottom: ${({ theme }) => theme.screen.rem(2)}px;
  margin-top: ${({ theme }) => theme.screen.rem(1.2)}px;
`;
