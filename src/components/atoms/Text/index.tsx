import React from 'react';
import { TextProps } from 'react-native';
import { TextStyleProps } from './style.types';

import { Content } from './styles';

interface ITextProps extends TextStyleProps, TextProps {
  children: React.ReactNode;
}

export function Text({ children, ...rest }: ITextProps) {
  return <Content {...rest}>{children}</Content>;
}
