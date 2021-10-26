import React, { useState, useEffect, useCallback } from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';

import { getCauses } from '@services/person/cause.api';

import { Text } from '@atoms/Text';
import { CauseSecondary } from '@organisms/Common/CauseSecondary';
import { CausesPagination } from '@templates/Common/CausesPagination';

import { Container, Content, CustomText, Header, Wrapper } from './styles';

export function Causes(): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const { data, status, isFetching } = useQuery(['allCauses', { page, limit: 10 }], getCauses, {
    keepPreviousData: true,
  });

  const onPress = () => {
    console.log('press');
  };

  const onChangePage = (_page: number) => {
    setPage(_page);
  };

  const renderItem = useCallback(
    ({ item }) => <CauseSecondary cause={item} onPress={onPress} />,
    [],
  );

  useEffect(() => {
    if (data) {
      if (data.results.length < data.total) {
        queryClient.prefetchQuery(['causes', { page: page }], getCauses);
      }
    }
  }, [data, page, queryClient]);

  return (
    <Container>
      <Content>
        <Header>
          <CustomText>Causas</CustomText>
        </Header>
        {status === 'loading' ? (
          <Wrapper>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text fontSize={rem(theme.fonts.size.sm)}>{t('loading')}</Text>
          </Wrapper>
        ) : status === 'error' ? (
          <Wrapper>
            <Text fontSize={rem(theme.fonts.size.md)}>
              {t('cause_list.fetch_cause_list_error')}
            </Text>
          </Wrapper>
        ) : status === 'success' && !!data ? (
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
      </Content>
    </Container>
  );
}
