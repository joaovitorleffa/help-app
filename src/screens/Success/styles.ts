import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: 56px;
  padding-bottom: 38px;
  padding-left: ${({ theme }) => theme.spacing.grid}px;
  padding-right: ${({ theme }) => theme.spacing.grid}px;
  background-color: ${({ theme }) => theme.colors.background};

  justify-content: space-between;
`;

export const TextWrapper = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(0.6)}px;
`;
