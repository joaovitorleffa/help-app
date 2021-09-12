import styled, { css } from 'styled-components/native';

interface ContainerProps {
  width?: string | number;
}

export const Container = styled.View<ContainerProps>`
  ${({ width }) =>
    width &&
    css`
      width: ${typeof width === 'number' ? `${width}px` : width};
    `}
`;
