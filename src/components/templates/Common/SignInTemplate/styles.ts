import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: 48px;
  padding-bottom: 38px;
  padding-left: ${({ theme }) => theme.spacing.grid}px;
  padding-right: ${({ theme }) => theme.spacing.grid}px;
`;

export const Header = styled.View`
  margin-bottom: ${({ theme }) => theme.screen.rem(6)}px;
`;
