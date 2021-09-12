import { Text } from '@atoms/Text';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { Input } from '../Input';

import { Container } from './styles';

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
  width?: string | number;
  mask?: (text: string) => string;
}

export function InputForm({ control, name, error, width, mask, ...rest }: InputFormProps) {
  const rem = useRem();
  const theme = useTheme();
  return (
    <Container width={width}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            {...rest}
            error={!!error}
            value={mask ? mask(value) : value}
            onChangeText={onChange}
          />
        )}
      />
      {!!error && (
        <Text fontSize={rem(0.65)} color={theme.colors.error}>
          {error}
        </Text>
      )}
    </Container>
  );
}
