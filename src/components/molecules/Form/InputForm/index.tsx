import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';
import { Text } from '@atoms/Text';

import { Container } from './styles';

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
  width?: string | number;
  mask?: (text: string) => string;
  defaultValue?: string;
}

export function InputForm({
  control,
  name,
  error,
  width,
  mask,
  defaultValue = '',
  ...rest
}: InputFormProps) {
  const rem = useRem();
  const theme = useTheme();
  return (
    <Container width={width}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
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
