import styled from 'styled-components/native';

export const Container = styled.View``;

export const Wrapper = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(0.8)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(1.2)}px;
`;
