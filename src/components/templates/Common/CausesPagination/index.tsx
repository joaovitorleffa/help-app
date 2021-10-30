import React, { useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import { CauseDto } from '@dto/cause-dto';

import { Pagination } from '@organisms/Common/Pagination';

import { List } from './styles';
import { useRem } from 'responsive-native';

const MAX_PAGES = 5;
const MAX_PAGES_LEFT = (MAX_PAGES - 1) / 2;

interface CausesProps {
  data: CauseDto[];
  totalResults: number;
  currentPage: number;
  renderItem: ({ item, index }: { item: any; index?: number }) => JSX.Element;
  onChangePage: (page: number) => void;
}

const AnimatedList = Animated.createAnimatedComponent(List);

export function CausesPagination({
  data,
  onChangePage,
  renderItem,
  currentPage = 1,
  totalResults = 40,
}: CausesProps): JSX.Element {
  const flatListRef = useRef<FlatList | null>(null);
  const rem = useRem();

  const keyExtractor = useCallback((item: CauseDto, index: number) => String(item.id) + index, []);

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
      contentContainerStyle={{ paddingTop: rem(0.4), paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
