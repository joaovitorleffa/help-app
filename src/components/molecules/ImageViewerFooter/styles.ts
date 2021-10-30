import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.screen.rem(2)}px;
  align-self: center;
`;
