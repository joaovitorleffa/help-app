import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width / 3;

export const Container = styled(RectButton)`
  width: ${({ theme }) => width - theme.spacing.grid}px;
  height: ${({ theme }) => width - theme.spacing.grid}px;
  background-color: ${({ theme }) => theme.colors.gray};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray_100};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.placeholder};
  font-size: ${({ theme }) => theme.screen.rem(1.4)}px;
`;
