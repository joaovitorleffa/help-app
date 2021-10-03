import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
  justify-content: space-between;
`;

export const Header = styled.View`
  margin-bottom: ${({ theme }) => theme.screen.rem(0.7)}px;
`;
