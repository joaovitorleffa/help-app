import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

type FilterProps = {
  isActive?: boolean;
};

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  margin: 0px ${({ theme }) => theme.spacing.grid}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
`;

export const SearchBar = styled.View`
  padding: 0px 12px;
  margin: ${({ theme }) => theme.screen.rem(1)}px 0px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  height: ${({ theme }) => theme.screen.rem(2.3)}px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.screen.rem(theme.fonts.size.sm)}px;
`;

export const FilterWrapper = styled(RectButton)`
  width: ${({ theme }) => theme.screen.rem(2)}px;
  height: ${({ theme }) => theme.screen.rem(2)}px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.screen.rem(1)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Filter = styled.TouchableOpacity<FilterProps>`
  padding: 6px 12px;
  margin-right: 6px;
  border-radius: 6px;
  align-self: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.gray};

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border-color: ${theme.colors.primary};
      background-color: ${theme.colors.secondary_50};
    `}
`;

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

export const CustomText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${({ theme }) => theme.screen.rem(theme.fonts.size.lg)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
