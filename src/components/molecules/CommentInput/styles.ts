import styled from 'styled-components/native';

export const Container = styled.View`
  padding: ${({ theme }) => theme.screen.rem(0.6)}px 0px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Content = styled.SafeAreaView`
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Photo = styled.Image`
  width: ${({ theme }) => theme.screen.rem(1.6)}px;
  height: ${({ theme }) => theme.screen.rem(1.6)}px;
  border-radius: ${({ theme }) => theme.screen.rem(1.6)}px;
`;

export const Left = styled.View`
  flex-direction: row;
  max-width: 75%;
`;

export const Input = styled.TextInput`
  margin-left: ${({ theme }) => theme.screen.rem(0.8)}px;

  font-family: 'NotoSansJP_400Regular';
  color: ${({ theme }) => theme.colors.text};
`;
