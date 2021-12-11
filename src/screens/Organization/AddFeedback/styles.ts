import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
  padding-bottom: 38px;
`;

export const Photos = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.screen.rem(0.7)}px;
`;
