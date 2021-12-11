import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Wrapper = styled.View`
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
`;

export const FeedbackWrapper = styled.ScrollView`
  margin-top: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const Info = styled.View`
  margin-left: ${({ theme }) => theme.screen.rem(0.8)}px;
`;
