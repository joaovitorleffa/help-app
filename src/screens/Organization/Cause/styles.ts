import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
`;

export const Wrapper = styled.View`
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
`;

export const Header = styled.View`
  margin-bottom: ${({ theme }) => theme.screen.rem(0.7)}px;
`;

export const FeedbackWrapper = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(1)}px;
`;
