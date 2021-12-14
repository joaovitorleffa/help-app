import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Photo = styled(FastImage)`
  height: ${({ theme }) => theme.screen.rem(14)}px;
  width: 100%;
`;

export const Wrapper = styled.View`
  height: ${({ theme }) => theme.screen.rem(14)}px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray};
`;

export const Content = styled.View`
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
`;

export const Header = styled.View`
  margin: ${({ theme }) => theme.screen.rem(1)}px 0px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => theme.screen.rem(2)}px;
  color: ${({ theme }) => theme.colors.placeholder};
`;
