import styled, { css } from 'styled-components/native';

type FilterProps = {
  isActive?: boolean;
};

export const Filter = styled.TouchableOpacity<FilterProps>`
  padding: 6px 12px;
  margin-right: 6px;
  margin-top: 6px;
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
