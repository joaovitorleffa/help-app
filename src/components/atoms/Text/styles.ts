import styled from 'styled-components/native';
import { TextStyleProps } from './style.types';

export const Content = styled.Text<TextStyleProps>`
  font-size: ${({ theme, fontSize }) => fontSize ?? theme.screen.rem(1)}px;
  font-family: ${({ theme, fontFamily }) =>
    fontFamily ? theme.fonts[fontFamily] : theme.fonts.regular};
  color: ${({ theme, color }) => color ?? theme.colors.title};
`;
