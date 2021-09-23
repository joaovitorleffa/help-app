import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs((props) => ({
  contentContainerStyle: {
    marginHorizontal: props.theme.spacing.grid,
  },
}))``;
