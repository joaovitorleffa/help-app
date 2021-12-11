import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';

import { getCauses } from '@services/person/cause.api';

import { Text } from '@atoms/Text';
import { CauseSecondary } from '@organisms/Common/CauseSecondary';
import { CausesPagination } from '@templates/Common/CausesPagination';

import { Container, Content, CustomText, FilterWrapper, Header, Icon, Wrapper } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { PersonNavigatorParamsList } from '@routes/types';
import { useNavigation } from '@react-navigation/core';
import { AllCausesDto } from '@dto/cause-dto';
import { Modalize } from 'react-native-modalize';
import { Filters, Situation, Type } from '@templates/Common/Filters';
import { useSpinner } from '@hooks/useSpinner';

type CausesNavigationScreenProp = StackNavigationProp<PersonNavigatorParamsList, 'PersonAppTab'>;

export function Causes(): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<CausesNavigationScreenProp>();
  const queryClient = useQueryClient();
  const spinner = useSpinner();

  const [page, setPage] = useState(1);
  const [type, setType] = useState<Type>('all');
  const [situation, setSituation] = useState<Situation>('all');

  const modalizeRef = useRef<Modalize | null>(null);

  const { data, status, isFetching } = useQuery(
    ['allCauses', { page, limit: 10, situation, type }],
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

  const onPress = useCallback(
    (cause: AllCausesDto) => {
      navigation.navigate('PersonCauseDetails', {
        id: cause.id,
        title: cause.title,
        type: cause.type,
        endAt: cause.endAt,
        description: cause.description,
        ongName: cause.organization.name,
      });
    },
    [navigation],
  );

  const onChangePage = (_page: number) => {
    setPage(_page);
  };

  const renderItem = useCallback(
    ({ item }) => <CauseSecondary cause={item} onPress={onPress} />,
    [onPress],
  );
  console;
  useEffect(() => {
    if (data) {
      if (data.results.length < data.total) {
        queryClient.prefetchQuery(['allCauses', { page: page, situation, type }], getCauses);
      }
    }
  }, [data, page, situation, type, queryClient]);

  useEffect(() => {
    isFetching && data?.results.length
      ? spinner({ visibility: true })
      : spinner({ visibility: false });
  }, [isFetching, data, spinner]);

  return (
    <Container>
      <Content>
        <Header>
          <CustomText>Causas</CustomText>
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
