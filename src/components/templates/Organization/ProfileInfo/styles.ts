import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Wrapper = styled.View`
  margin: 12px ${({ theme }) => theme.spacing.grid}px;
`;
