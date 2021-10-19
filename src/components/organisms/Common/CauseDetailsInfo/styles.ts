import styled from 'styled-components/native';

export const Container = styled.View``;

export const Footer = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(0.9)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
