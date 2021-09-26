import React, { useCallback } from 'react';
import { useTheme } from 'styled-components';
import Animated from 'react-native-reanimated';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';

import { CauseDto } from '@dto/cause-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { Cause } from '@organisms/Common/Cause';

import { List } from './styles';

interface CausesProps {
  data: CauseDto[];
  refreshing: boolean;
  isLoadingMore: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  onEdit: (cause: UpdateCauseDto) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const AnimatedList = Animated.createAnimatedComponent(List);

export function Causes({
  data,
  onEdit,
  onScroll,
  onRefresh,
  refreshing,
  onEndReached,
  isLoadingMore,
}: CausesProps): JSX.Element {
  const theme = useTheme();

  const keyExtractor = useCallback((item: CauseDto, index: number) => String(item.id) + index, []);

  const renderItem = useCallback(({ item }) => <Cause cause={item} onEdit={onEdit} />, [onEdit]);

  const ListFooterComponent = useCallback(
    () => (isLoadingMore ? <ActivityIndicator color={theme.colors.primary} /> : null),
    [theme, isLoadingMore],
  );

  return (
    <AnimatedList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onScroll={onScroll}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
      ListFooterComponent={ListFooterComponent}
      refreshing={refreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
}
