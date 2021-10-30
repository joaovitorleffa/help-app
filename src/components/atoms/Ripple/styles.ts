import styled from 'styled-components/native';

export const Ripple = styled.View`
  position: absolute;
  width: ${({ theme }) => theme.screen.rem(3)}px;
  height: ${({ theme }) => theme.screen.rem(3)}px;
  border-radius: ${({ theme }) => theme.screen.rem(1.5)}px;
`;
