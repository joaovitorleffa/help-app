import React from 'react';
import { isBefore } from 'date-fns';
import { useQuery } from 'react-query';
import { SafeAreaView, ScrollView } from 'react-native';
import { useRem } from 'responsive-native';
import { Skeleton } from '@motify/skeleton';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';

import { getCauseById } from '@services/organization';
import { OrganizationNavigatorParamsList } from '@routes/types';

import { Info } from '@molecules/Info';
import { Button } from '@molecules/Button';
import { BackHeader } from '@molecules/BackHeader';
import { FloatButton } from '@molecules/FloatButton';
import { Feedback } from '@organisms/Common/Feedback';
import { CauseDetailsInfo } from '@organisms/Common/CauseDetailsInfo';

import { Container, Content, Wrapper, FeedbackWrapper, AddFeedbackWrapper } from './styles';
import { ImageProps } from '@utils/image';

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

  const handleEditFeedback = () => {
    const images: Array<ImageProps> = [];
    if (data?.feedbackImages) {
      for (let i = 0; i < 3; i++) {
        const image = data?.feedbackImages[i]
          ? { uri: data?.feedbackImages[i].name }
          : ({} as ImageProps);
        images.push(image);
      }
    }

    navigation.navigate('AddFeedback', {
      id,
      feedback: data?.feedback,
      images: images.length ? images : undefined,
    });
  };

  const handleEdit = () => {
    navigation.navigate('EditCause', { ...route.params });
  };

  const handleAddFeedback = () => {
    navigation.navigate('AddFeedback', { id });
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        <Content
          style={{ justifyContent: isEnded && !data?.feedback ? 'space-between' : 'flex-start' }}>
          <Wrapper>
            <BackHeader title={title} />

            <CauseDetailsInfo endAt={endAt} description={description} type={type} />
          </Wrapper>
          {isEnded && (
            <Skeleton show={isLoading}>
              <FeedbackWrapper>
                <Feedback
                  feedback={data?.feedback ?? ''}
                  images={data?.feedbackImages ?? []}
                  onEditFeedback={handleEditFeedback}
                />
              </FeedbackWrapper>
            </Skeleton>
          )}
        </Content>
      </ScrollView>
      {isEnded && !data?.feedback && !isLoading && !isFetching && (
        <AddFeedbackWrapper>
          <Info text={t('cause.add_feedback_info')} variant="info" />
          <Button
            title={t('cause.add_feedback')}
            color={theme.colors.primary}
            textColor={theme.colors.title_secondary}
            style={{ marginTop: rem(0.9) }}
            onPress={handleAddFeedback}
          />
        </AddFeedbackWrapper>
      )}
      {!isEnded && (
        <SafeAreaView>
          <FloatButton icon="edit" onPress={handleEdit} style={{ bottom: 12 }} />
        </SafeAreaView>
      )}
    </Container>
  );
}
