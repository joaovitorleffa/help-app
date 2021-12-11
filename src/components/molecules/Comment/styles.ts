import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.screen.rem(0.6)}px;
`;
