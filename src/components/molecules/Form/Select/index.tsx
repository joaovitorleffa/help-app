import React, { useRef, useCallback, useMemo } from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { TouchableOpacityProps } from 'react-native';

import { Text } from '@atoms/Text';

import { Content, Header, Item, Icon, ItemWrapper } from './styles';

export type Items = {
  value: string;
  label: string;
};

interface SelectProps extends TouchableOpacityProps {
  error?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  items: Items[];
}

export function Select({
  error,
  items,
  placeholder,
  value,
  onChange,
  ...rest
}: SelectProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleChangeItem = useCallback(
    (item: Items) => {
      onChange(item.value);
      modalizeRef.current?.close();
    },
    [onChange],
  );

  const renderItem = useCallback(
    ({ item }: { item: Items }) => (
      <Item onPress={() => handleChangeItem(item)}>
        <ItemWrapper>
          <Text
            fontSize={rem(0.8)}
            lineHeight={rem(1)}
            color={value === item.value ? theme.colors.title : theme.colors.title}>
            {item.label}
          </Text>
          {value === item.value && <Icon name="checkcircle" />}
        </ItemWrapper>
      </Item>
    ),
    [rem, handleChangeItem, value, theme],
  );

  const ListHeaderComponent = useCallback(
    () => (
      <Header>
        <Text fontFamily="medium">Selecione</Text>
      </Header>
    ),
    [],
  );

  const keyExtractor = useCallback((item, index) => String(index), []);

  return (
    <>
      <Content {...rest} error={error} activeOpacity={0.85} onPress={onOpen}>
        <Text fontSize={rem(0.8)} lineHeight={rem(1)}>
          {value ? t(`common.${value}`) : placeholder}
        </Text>
      </Content>
      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          flatListProps={{
            data: items,
            renderItem,
            keyExtractor,
            ListHeaderComponent,
            contentContainerStyle: {
              paddingBottom: 42,
            },
          }}
        />
      </Portal>
    </>
  );
}
