import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
`;
