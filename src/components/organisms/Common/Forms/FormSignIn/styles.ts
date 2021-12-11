import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.screen.rem(3)}px;
`;

export const Wrapper = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(0.8)}px;
  margin-bottom: ${({ theme }) => theme.screen.rem(1.2)}px;
`;
