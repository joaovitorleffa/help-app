import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.View`
  padding-top: 48px;
  padding-bottom: 38px;
  padding-left: ${({ theme }) => theme.spacing.grid}px;
  padding-right: ${({ theme }) => theme.spacing.grid}px;
`;

export const Header = styled.View`
  margin-bottom: ${({ theme }) => theme.screen.rem(5)}px;
`;

export const Wrapper = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(1.2)}px;
`;

export const ErrorsWrapper = styled.View`
  padding-top: ${({ theme }) => theme.screen.rem(1)}px;
`;
