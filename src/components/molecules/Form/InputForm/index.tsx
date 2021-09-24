import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';
import { Text } from '@atoms/Text';

import { Container } from './styles';
import { TextArea } from '../TextArea';
import { Items, Select } from '../Select';
import { DatePicker } from '../DatePicker';

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
  width?: string | number;
  mask?: (text: string) => string;
  defaultValue?: string;
  items?: Items[];
  inputType?: 'textArea' | 'input' | 'select' | 'date';
}

export function InputForm({
  control,
  name,
  error,
  width,
  mask,
  items,
  defaultValue = '',
  inputType = 'input',
  ...rest
}: InputFormProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  return (
    <Container width={width}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) =>
          inputType === 'input' ? (
            <Input
              {...rest}
              error={!!error}
              value={mask ? mask(value) : value}
              onChangeText={onChange}
            />
          ) : inputType === 'textArea' ? (
            <TextArea {...rest} error={!!error} value={value} onChangeText={onChange} />
          ) : inputType === 'select' ? (
            <Select
              style={rest.style}
              items={items!}
              placeholder={rest.placeholder!}
              error={!!error}
              value={value}
              onChange={onChange}
            />
          ) : (
            <DatePicker
              placeholder={rest.placeholder!}
              error={!!error}
              value={value}
              onChange={onChange}
              style={rest.style}
            />
          )
        }
      />
      {!!error && (
        <Text fontSize={rem(0.65)} color={theme.colors.error}>
          {error}
        </Text>
      )}
    </Container>
  );
}
