import React, { useCallback } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { CauseDto } from '@dto/cause-dto';

import { List } from './styles';
import { Cause } from '@organisms/Common/Cause';
import Animated from 'react-native-reanimated';
import { useTheme } from 'styled-components';

interface CausesProps {
  data: CauseDto[];
  isLoadingMore: boolean;
  onEndReached: () => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const AnimatedList = Animated.createAnimatedComponent(List);

export function Causes({ data, onEndReached, isLoadingMore, onScroll }: CausesProps): JSX.Element {
  const theme = useTheme();

  const keyExtractor = useCallback((item: CauseDto, index: number) => String(item.id) + index, []);

  const renderItem = useCallback(({ item }) => <Cause cause={item} />, []);

  const ListFooterComponent = useCallback(
    () => (isLoadingMore ? <ActivityIndicator color={theme.colors.primary} /> : null),
    [theme, isLoadingMore],
  );

  return (
    <AnimatedList
      data={data}
      bounces={false}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onScroll={onScroll}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
      ListFooterComponent={ListFooterComponent}
      showsVerticalScrollIndicator={false}
    />
  );
}
