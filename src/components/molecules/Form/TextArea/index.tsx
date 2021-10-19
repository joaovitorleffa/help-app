import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Content } from './styles';

interface TextAreaProps extends TextInputProps {
  error?: boolean;
}

export function TextArea({ error, ...rest }: TextAreaProps): JSX.Element {
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
      error={error}
      onFocus={onFocus}
      onBlur={onBlur}
      isFocused={isFocused}
      multiline
      placeholderTextColor={
        isFocused
          ? theme.colors.title_secondary
          : error
          ? theme.colors.error
          : theme.colors.placeholder
      }
      {...rest}
    />
  );
}
