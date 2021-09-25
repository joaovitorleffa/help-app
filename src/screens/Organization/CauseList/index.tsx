import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { OrganizationAppNavigatorParamsList, OrganizationNavigatorParamsList } from '@routes/types';

import { Text } from '@atoms/Text';
import { FloatButton } from '@molecules/FloatButton';

import { Container, Content, CustomText, Header } from './styles';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';
import { Causes } from '@templates/Organization/Causes';
import { showMessage } from 'react-native-flash-message';
import { api } from '@services/api';
import { CauseDto } from '@dto/cause-dto';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

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

  const [causes, setCauses] = useState<CauseDto[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

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

  const fetchCausesByOrganization = useCallback(async (_page: number) => {
    try {
      const { data } = await api.get(`causes/self?page=${_page}&limit=5`);
      setCauses((prev) => [...prev, ...data.results]);
      setTotalResults(data.total);
    } catch (error) {
      console.log('[fetchCausesByOrganization] error:', error);
      showMessage({
        message: t('common.error'),
        description: t('errors.list_causes_error'),
        type: 'danger',
      });
    } finally {
      setIsLoadingMore(false);
    }
  }, []);

  const onEndReached = useCallback(() => {
    if (!isLoadingMore && causes.length < totalResults) {
      setIsLoadingMore(true);
      setPage((prev) => {
        const nextPage = prev + 1;
        fetchCausesByOrganization(nextPage);
        return nextPage;
      });
    }
  }, [fetchCausesByOrganization, causes.length, totalResults, isLoadingMore]);

  useEffect(() => {
    fetchCausesByOrganization(1);
  }, [fetchCausesByOrganization]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
      <Content>
        <AnimatedHeader style={headerAnimatedStyle}>
          <AnimatedText style={textContentAnimatedStyle}>{t('cause_list.title')}</AnimatedText>
        </AnimatedHeader>
        <Causes
          data={causes}
          onScroll={scrollHandler}
          onEndReached={onEndReached}
          isLoadingMore={isLoadingMore}
        />
      </Content>
      <FloatButton icon="add" onPress={handleAdd} />
    </Container>
  );
}
