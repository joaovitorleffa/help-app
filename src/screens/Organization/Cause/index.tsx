import React from 'react';
import { View } from 'react-native';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';

import { OrganizationNavigatorParamsList } from '@routes/types';

import { Info } from '@molecules/Info';
import { Button } from '@molecules/Button';
import { BackHeader } from '@molecules/BackHeader';
import { CauseDetailsInfo } from '@organisms/Common/CauseDetailsInfo';

import { Container, Content, Wrapper, FeedbackWrapper, Header } from './styles';
import { isBefore } from 'date-fns';
import { FloatButton } from '@molecules/FloatButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from 'react-query';
import { getCauseById } from '@services/organization';
import { Skeleton } from '@motify/skeleton';
import { Feedback } from '@organisms/Common/Feedback';

type CauseRouteScreenProp = RouteProp<OrganizationNavigatorParamsList, 'Cause'>;

type CauseNavigationScreenProp = StackNavigationProp<OrganizationNavigatorParamsList, 'Cause'>;

export function Cause(): JSX.Element {
  const route = useRoute<CauseRouteScreenProp>();
  const navigation = useNavigation<CauseNavigationScreenProp>();

  const theme = useTheme();
  const rem = useRem();
  const { t } = useTranslation();

  const { id, title, description, endAt, type } = route.params;

  const { data, isLoading, isFetching } = useQuery(['cause', id], () => getCauseById(id));

  const isEnded = isBefore(new Date(endAt), new Date());

  const handleEdit = () => {
    navigation.navigate('EditCause', { ...route.params });
  };

  const handleAddFeedback = () => {
    navigation.navigate('AddFeedback', { id });
  };

  return (
    <Container>
      <Content
        style={{ justifyContent: isEnded && !data?.feedback ? 'space-between' : 'flex-start' }}>
        <Wrapper>
          <Header>
            <BackHeader title={title} />
          </Header>
          <CauseDetailsInfo endAt={endAt} description={description} type={type} />
        </Wrapper>
        {isEnded && (
          <Skeleton show={isLoading}>
            <FeedbackWrapper>
              <Feedback feedback={data?.feedback ?? ''} images={data?.feedbackImages ?? []} />
            </FeedbackWrapper>
          </Skeleton>
        )}
        {isEnded && !data?.feedback && !isLoading && !isFetching && (
          <Wrapper>
            <Info text={t('cause.add_feedback_info')} variant="info" />
            <Button
              title={t('cause.add_feedback')}
              color={theme.colors.primary}
              textColor={theme.colors.title_secondary}
              style={{ marginTop: rem(0.9) }}
              onPress={handleAddFeedback}
            />
          </Wrapper>
        )}
      </Content>
      {!isEnded && <FloatButton icon="edit" onPress={handleEdit} style={{ bottom: 40 }} />}
    </Container>
  );
}
