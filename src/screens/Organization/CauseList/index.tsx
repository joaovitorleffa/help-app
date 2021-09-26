import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, useFocusEffect, useNavigation } from '@react-navigation/core';
import { OrganizationAppNavigatorParamsList, OrganizationNavigatorParamsList } from '@routes/types';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { api } from '@services/api';
import { CauseDto } from '@dto/cause-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { FloatButton } from '@molecules/FloatButton';
import { Causes } from '@templates/Organization/Causes';

import { Container, Content, CustomText, Header } from './styles';
import { Pagination } from '@dto/pagination-dto';
import SkeletonContent from 'react-native-skeleton-content';

const AnimatedText = Animated.createAnimatedComponent(CustomText);
const AnimatedHeader = Animated.createAnimatedComponent(Header);

type CauseListNavigationScreenProp = CompositeNavigationProp<
  StackNavigationProp<OrganizationAppNavigatorParamsList, 'CauseList'>,
  StackNavigationProp<OrganizationNavigatorParamsList>
>;

export function CauseList(): JSX.Element {
  const navigation = useNavigation<CauseListNavigationScreenProp>();
  const { t } = useTranslation();
  const theme = useTheme();
  const rem = useRem();

  const LG = useMemo(() => rem(theme.fonts.size.lg), [rem, theme]);

  const [page, setPage] = useState(1);
  const [causes, setCauses] = useState<CauseDto[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [totalResults, setTotalResults] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 60], [60, 0], Extrapolate.CLAMP),
      opacity: interpolate(scrollY.value, [0, 60], [1, 0], Extrapolate.CLAMP),
    };
  });

  const textContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(scrollY.value, [0, 60], [LG, 10], Extrapolate.CLAMP),
    };
  });

  const handleAdd = useCallback(() => {
    navigation.navigate('AddCause');
  }, [navigation]);

  const handleEdit = useCallback(
    (cause: UpdateCauseDto) => {
      navigation.navigate('EditCause', cause);
    },
    [navigation],
  );

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  const refresh = useCallback(() => {
    setPage(1);
    setIsRefreshing(true);
    setShouldFetch(true);
  }, []);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    if (causes.length && !isRefreshing) {
      if (causes.length >= totalResults) {
        return;
      }
    }

    const fetch = async () => {
      try {
        setIsLoadingMore(true);

        const { data } = await api.get<Pagination<CauseDto>>('causes/self', {
          params: { page, limit: 2 },
        });

        const { total, results } = data;

        setTimeout(() => {
          page === 1 ? setCauses(results) : setCauses((prev) => [...prev, ...results]);
          setTotalResults(total);
          setPage((prev) => prev + 1);
        }, 2000);
      } catch (error) {
        console.log('[fetch] error:', error);
        showMessage({
          message: t('common.error'),
          description: t('errors.list_causes_error'),
          type: 'danger',
        });
      } finally {
        setTimeout(() => {
          setShouldFetch(false);
          setIsLoadingMore(false);
          setIsRefreshing(false);
        }, 2000);
      }
    };

    fetch();
  }, [page, causes.length, totalResults, shouldFetch, isRefreshing, t]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
      <Content>
        <AnimatedHeader style={headerAnimatedStyle}>
          <AnimatedText style={textContentAnimatedStyle}>{t('cause_list.title')}</AnimatedText>
        </AnimatedHeader>
        <SkeletonContent
          animationType="pulse"
          isLoading={isLoadingMore && !causes.length}
          containerStyle={{ flex: 1, width: '100%' }}
          layout={[
            {
              key: '1',
              width: '100%',
              height: rem(8),
              marginTop: 24,
            },
            {
              key: '2',
              width: '100%',
              height: rem(8),
              marginTop: 24,
            },
            {
              key: '3',
              width: '100%',
              height: rem(8),
              marginTop: 24,
            },
            {
              key: '4',
              width: '100%',
              height: rem(8),
              marginTop: 24,
            },
          ]}>
          <Causes
            data={causes}
            onEdit={handleEdit}
            refreshing={isRefreshing}
            onScroll={scrollHandler}
            onEndReached={fetchMore}
            onRefresh={refresh}
            isLoadingMore={isLoadingMore}
          />
        </SkeletonContent>
      </Content>
      <FloatButton icon="add" onPress={handleAdd} />
    </Container>
  );
}
