import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

export const Container = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width}px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray};

  align-items: center;
  justify-content: center;
`;

export const Photo = styled(FastImage)`
  width: 100%;
  height: 100%;
`;

export const Icon = styled(MaterialCommunityIcons)`
  font-size: ${({ theme }) => theme.screen.rem(2)}px;
  color: ${({ theme }) => theme.colors.placeholder};
`;

export const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
`;
