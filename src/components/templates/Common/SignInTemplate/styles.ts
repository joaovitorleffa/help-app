import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 48px;
  margin-bottom: 38px;
  margin-left: ${({ theme }) => theme.spacing.grid}px;
  margin-right: ${({ theme }) => theme.spacing.grid}px;
  justify-content: space-between;
`;

export const Header = styled.View`
  margin-bottom: ${({ theme }) => theme.screen.rem(6)}px;
`;
