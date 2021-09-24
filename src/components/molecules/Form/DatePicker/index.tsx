import React, { useState } from 'react';
import { useRem } from 'responsive-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Text } from '@atoms/Text';

import { Container } from './styles';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';
import { placeholder } from '@babel/types';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Show } from '@atoms/Show';

interface DatePickerProps extends TouchableOpacityProps {
  value: string;
  error?: boolean;
  placeholder: string;
  onChange: (value: string) => void;
}

export function DatePicker({
  value,
  placeholder,
  error,
  onChange,
  ...rest
}: DatePickerProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date.toJSON());
    hideDatePicker();
  };

  return (
    <Container onPress={showDatePicker} error={error} activeOpacity={0.75} {...rest}>
      <Show
        when={!!value}
        fallback={
          <Text
            fontSize={rem(0.8)}
            lineHeight={rem(1)}
            color={theme.colors[error ? 'error' : 'placeholder']}>
            {placeholder}
          </Text>
        }>
        <Text
          fontSize={rem(0.8)}
          lineHeight={rem(1)}
          color={theme.colors[error ? 'error' : 'title']}>
          {value && format(new Date(value), 'dd/MM/yyyy')}
        </Text>
      </Show>

      <DateTimePickerModal
        mode="date"
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS={t('common.confirm')}
        cancelTextIOS={t('common.cancel')}
      />
    </Container>
  );
}