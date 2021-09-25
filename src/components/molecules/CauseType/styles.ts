import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: flex-start;
  padding: ${({ theme }) => theme.screen.rem(0.2)}px ${({ theme }) => theme.screen.rem(0.8)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
