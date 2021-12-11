import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 30px;
  width: 60px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.gray_50};

  justify-content: center;
`;

export const Content = styled.View`
  width: 26px;
  height: 26px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 26px;
`;
