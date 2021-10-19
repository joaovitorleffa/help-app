import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width / 3;

export const Container = styled.TouchableOpacity`
  width: ${({ theme }) => width - theme.spacing.grid}px;
  height: ${({ theme }) => width - theme.spacing.grid}px;
  background-color: ${({ theme }) => theme.colors.gray};
  align-items: center;
  justify-content: center;
  overflow: hidden;

  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray_100};
`;

export const Icon = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.placeholder};
  font-size: ${({ theme }) => theme.screen.rem(1.4)}px; ;
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;
