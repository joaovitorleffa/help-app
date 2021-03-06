import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modalize } from 'react-native-modalize';
import { useQuery, useQueryClient } from 'react-query';
import { StackNavigationProp } from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { OrganizationAppNavigatorParamsList, OrganizationNavigatorParamsList } from '@routes/types';

import { useSpinner } from '@hooks/useSpinner';
import { UpdateCauseDto } from '@dto/update-cause-dto';
import { getCauses } from '@services/organization/causes.api';

import { Text } from '@atoms/Text';
import { Cause } from '@organisms/Common/Cause';
import { FloatButton } from '@molecules/FloatButton';
import { CausesPagination } from '@templates/Common/CausesPagination';
import { Filters, Situation, Type } from '@templates/Common/Filters';

import { Container, Content, CustomText, Header, FilterWrapper, Icon, Wrapper } from './styles';

type CauseListNavigationScreenProp = CompositeNavigationProp<
  StackNavigationProp<OrganizationAppNavigatorParamsList, 'CauseList'>,
  StackNavigationProp<OrganizationNavigatorParamsList>
>;

export function CauseList(): JSX.Element {
  const navigation = useNavigation<CauseListNavigationScreenProp>();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const theme = useTheme();
  const rem = useRem();
  const spinner = useSpinner();

  const modalizeRef = useRef<Modalize | null>(null);

  const [page, setPage] = useState(1);
  const [type, setType] = useState<Type>('all');
  const [situation, setSituation] = useState<Situation>('all');

  const { data, status, isFetching } = useQuery(
    ['causes', { page, limit: 10, situation, type }],
    getCauses,
    {
      keepPreviousData: true,
    },
  );

  const onChangeSituation = (situation: Situation) => {
    setSituation(situation);
    setPage(1);
  };

  const onChangeType = (type: Type) => {
    setType(type);
    setPage(1);
  };

  const handleAdd = () => {
    navigation.navigate('AddCause');
  };

  const handleEdit = useCallback((cause: UpdateCauseDto) => {
    navigation.navigate('Cause', cause);
  }, []);

  const onChangePage = (_page: number) => {
    setPage(_page);
  };

  const renderItem = useCallback(
    ({ item }) => <Cause cause={item} onPress={handleEdit} />,
    [handleEdit],
  );

  useEffect(() => {
    if (data) {
      if (data.results.length < data.total) {
        queryClient.prefetchQuery(['causes', { page: page, situation, type }], getCauses);
      }
    }
  }, [data, situation, type, page, queryClient]);

  useEffect(() => {
    isFetching && data?.results.length
      ? spinner({ visibility: true })
      : spinner({ visibility: false });
  }, [isFetching, data, spinner]);

  return (
    <Container>
      <Content>
        <Header>
          <CustomText>{t('cause_list.title')}</CustomText>
          <FilterWrapper onPress={() => modalizeRef.current?.open()} style={styles.shadow}>
            <Icon name="sliders" />
          </FilterWrapper>
        </Header>
        {status === 'loading' ? (
          <Wrapper>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text fontSize={rem(theme.fonts.size.sm)}>{t('common.loading')}...</Text>
          </Wrapper>
        ) : status === 'error' ? (
          <Wrapper>
            <Text fontSize={rem(theme.fonts.size.md)}>
              {t('cause_list.fetch_cause_list_error')}
            </Text>
          </Wrapper>
        ) : data ? (
          <CausesPagination
            renderItem={renderItem}
            data={data.results}
            totalResults={data.total}
            currentPage={page}
            onChangePage={onChangePage}
          />
        ) : (
          <Wrapper>
            <Text fontSize={rem(theme.fonts.size.md)}>Nenhuma causa encontrada</Text>
          </Wrapper>
        )}
        <FloatButton icon="add" onPress={handleAdd} />
      </Content>
      <Filters ref={modalizeRef} {...{ situation, type, onChangeSituation, onChangeType }} />
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

    elevation: 4,
  },
});
