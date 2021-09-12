import styled, { css } from 'styled-components/native';
import { TextStyleProps } from './style.types';

export const Content = styled.Text<TextStyleProps>`
  font-size: ${({ theme, fontSize }) => fontSize ?? theme.screen.rem(1)}px;
  font-family: ${({ theme, fontFamily }) =>
    fontFamily ? theme.fonts[fontFamily] : theme.fonts.regular};
  color: ${({ theme, color }) => color ?? theme.colors.title};
  line-height: ${({ theme, fontSize }) =>
    (fontSize ?? theme.screen.rem(1)) + theme.screen.rem(0.5)}px;

  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `}
`;
