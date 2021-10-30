import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.SafeAreaView`
  flex: 1;
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
  margin-top: 48px;
`;
