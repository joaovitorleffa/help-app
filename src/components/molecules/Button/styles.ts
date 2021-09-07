import styled from 'styled-components/native';

type ContainerProps = {
  color?: string;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${({ theme }) => theme.screen.rem(2.8)};
  background-color: ${({ theme, color }) => color ?? theme.colors.background};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;
