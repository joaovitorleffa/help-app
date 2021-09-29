import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
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
import { Pagination } from '@dto/pagination-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { Text } from '@atoms/Text';
import { FloatButton } from '@molecules/FloatButton';
import { Causes } from '@templates/Organization/Causes';

import {
  Container,
  Content,
  CustomText,
  Filter,
  FilterWrapper,
  Header,
  Icon,
  Row,
  SearchBar,
  SearchInput,
} from './styles';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

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

  const modalizeRef = useRef<Modalize | null>(null);
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

        page === 1 ? setCauses(results) : setCauses((prev) => [...prev, ...results]);
        setTotalResults(total);
        setPage((prev) => prev + 1);
      } catch (error) {
        console.log('[fetch] error:', error);
        showMessage({
          message: t('common.error'),
          description: t('errors.list_causes_error'),
          type: 'danger',
        });
      } finally {
        setShouldFetch(false);
        setIsLoadingMore(false);
        setIsRefreshing(false);
      }
    };

    fetch();
  }, [page, causes.length, totalResults, shouldFetch, isRefreshing, t]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />

      <Content>
        <Header style={[headerAnimatedStyle, styles.shadow]}>
          <CustomText style={textContentAnimatedStyle}>{t('cause_list.title')}</CustomText>
          <FilterWrapper onPress={() => modalizeRef.current?.open()}>
            <Icon name="sliders" />
          </FilterWrapper>
        </Header>
        {isLoadingMore && !causes.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text fontSize={rem(theme.fonts.size.sm)}>{t('loading')}</Text>
          </View>
        ) : (
          <Causes
            data={causes}
            onEdit={handleEdit}
            refreshing={isRefreshing}
            onScroll={scrollHandler}
            onEndReached={fetchMore}
            onRefresh={refresh}
            isLoadingMore={isLoadingMore}
          />
        )}
        <FloatButton icon="add" onPress={handleAdd} />
      </Content>
      <Portal>
        <Modalize
          ref={modalizeRef}
          childrenStyle={{ paddingVertical: 20, paddingHorizontal: theme.spacing.grid }}>
          <SearchBar>
            <Icon name="search" />
            <SearchInput />
          </SearchBar>
          <Text fontFamily="bold" fontSize={rem(theme.fonts.size.sm)} style={{ marginBottom: 6 }}>
            Situação
          </Text>
          <Row>
            <Filter isActive>
              <Text fontSize={rem(theme.fonts.size.sm)} color={theme.colors.primary}>
                Encerrado
              </Text>
            </Filter>
            <Filter>
              <Text fontSize={rem(theme.fonts.size.sm)} color={theme.colors.text}>
                Em andamento
              </Text>
            </Filter>
          </Row>
          <Text
            fontFamily="bold"
            fontSize={rem(theme.fonts.size.sm)}
            style={{ marginBottom: 6, marginTop: 16 }}>
            Tipo
          </Text>
          <Row>
            <Filter>
              <Text fontSize={rem(theme.fonts.size.sm)} color={theme.colors.text}>
                Doação
              </Text>
            </Filter>
            <Filter>
              <Text fontSize={rem(theme.fonts.size.sm)} color={theme.colors.text}>
                Trabalho voluntário
              </Text>
            </Filter>
          </Row>
        </Modalize>
      </Portal>
    </Container>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7E6EF5',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
