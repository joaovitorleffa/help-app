import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-top: 56px;
  padding-bottom: 38px;
  padding-left: ${({ theme }) => theme.spacing.grid}px;
  padding-right: ${({ theme }) => theme.spacing.grid}px;
`;

export const Header = styled.View``;

export const Wrapper = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(1.2)};
`;
