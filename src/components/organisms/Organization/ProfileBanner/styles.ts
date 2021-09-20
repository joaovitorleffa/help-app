import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  height: 300px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => theme.screen.rem(2)}px;
  color: ${({ theme }) => theme.colors.placeholder};
`;

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${getStatusBarHeight()}px;
  background-color: ${({ theme }) => theme.colors.gray};
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;
