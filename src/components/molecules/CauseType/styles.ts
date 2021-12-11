import styled from 'styled-components/native';

interface ContainerProps {
  variant: 'danger' | 'success';
}

export const Container = styled.View<ContainerProps>`
  align-self: flex-start;
  padding: ${({ theme }) => theme.screen.rem(0.2)}px ${({ theme }) => theme.screen.rem(0.8)}px;
  background-color: ${({ theme, variant }) =>
    variant === 'danger' ? theme.colors.error : theme.colors.success};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
