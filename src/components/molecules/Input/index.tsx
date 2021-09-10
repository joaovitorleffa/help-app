import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Content } from './styles';

interface InputProps extends TextInputProps {
  width?: string | number;
}

export function Input({ ...rest }: InputProps) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <Content
      onFocus={onFocus}
      onBlur={onBlur}
      isFocused={isFocused}
      placeholderTextColor={isFocused ? theme.colors.title_secondary : theme.colors.placeholder}
      {...rest}
    />
  );
}
