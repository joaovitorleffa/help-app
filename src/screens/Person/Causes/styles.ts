import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CustomText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.screen.rem(theme.fonts.size.lg)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Content = styled.SafeAreaView`
  flex: 1;
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
  margin-top: 48px;
`;

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
