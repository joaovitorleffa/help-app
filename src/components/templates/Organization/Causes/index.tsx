import React, { useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import { CauseDto } from '@dto/cause-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { Cause } from '@organisms/Common/Cause';
import { Pagination } from '@organisms/Common/Pagination';

import { List } from './styles';

const MAX_PAGES = 5;
const MAX_PAGES_LEFT = (MAX_PAGES - 1) / 2;

interface CausesProps {
  data: CauseDto[];
  totalResults: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  onEdit: (cause: UpdateCauseDto) => void;
}

const AnimatedList = Animated.createAnimatedComponent(List);

export function Causes({
  data,
  onEdit,
  onChangePage,
  currentPage = 1,
  totalResults = 40,
}: CausesProps): JSX.Element {
  const flatListRef = useRef<FlatList | null>(null);

  const keyExtractor = useCallback((item: CauseDto, index: number) => String(item.id) + index, []);

  const renderItem = useCallback(({ item }) => <Cause cause={item} onEdit={onEdit} />, [onEdit]);

  const pages = Math.ceil(totalResults / 10);

  const handleChangePage = useCallback(
    (page: number) => {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      onChangePage(page);
    },
    [onChangePage],
  );

  const ListFooterComponent = useCallback(
    () => (
      <Pagination
        currentPage={currentPage}
        pages={pages}
        maxPages={MAX_PAGES}
        onChange={handleChangePage}
        maxPagesLeft={MAX_PAGES_LEFT}
      />
    ),
    [pages, currentPage, handleChangePage],
  );

  return (
    <AnimatedList
      data={data}
      ref={flatListRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
