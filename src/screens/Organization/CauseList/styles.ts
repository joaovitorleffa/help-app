import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
`;

export const Header = styled.View``;

export const CustomText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.screen.rem(theme.fonts.size.lg)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
