import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Content } from './styles';

interface InputProps extends TextInputProps {}

export function Input({ ...rest }: InputProps) {
  const theme = useTheme();
  return (
    <Content
      onChangeText={rest.onChangeText}
      value={rest.value}
      placeholderTextColor={theme.colors.placeholder}
      {...rest}
    />
  );
}
