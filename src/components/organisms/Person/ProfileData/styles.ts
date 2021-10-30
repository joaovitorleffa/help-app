import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.View`
  margin-left: ${({ theme }) => theme.screen.rem(0.8)}px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => theme.screen.rem(1.4)}px;
  color: ${({ theme }) => theme.colors.title};
`;
