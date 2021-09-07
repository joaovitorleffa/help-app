import styled from 'styled-components/native';

export const Content = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.gray};
  padding: ${({ theme }) => theme.screen.rem(0.8)}px;
  font-size: ${({ theme }) => theme.screen.rem(0.8)}px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
`;
