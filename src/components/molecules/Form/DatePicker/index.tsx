import React, { useState } from 'react';
import { useRem } from 'responsive-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Text } from '@atoms/Text';

import { Container } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface DatePickerProps extends TouchableOpacityProps {}

export function DatePicker({ ...rest }: DatePickerProps): JSX.Element {
  const rem = useRem();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <Container onPress={showDatePicker} {...rest}>
      <Text fontSize={rem(0.8)} lineHeight={rem(1)}>
        data
      </Text>
      <DateTimePickerModal
        mode="date"
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
      />
    </Container>
  );
}
