import React, { useState } from 'react';
import { isBefore } from 'date-fns';
import { useQuery } from 'react-query';
import { SafeAreaView, ScrollView } from 'react-native';
import { useRem } from 'responsive-native';
import { Skeleton } from '@motify/skeleton';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import ImageView from 'react-native-image-viewing';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';

import { getCauseById } from '@services/organization';
import { OrganizationNavigatorParamsList, RootNavigatorParamsList } from '@routes/types';

import { Info } from '@molecules/Info';
import { Button } from '@molecules/Button';
import { BackHeader } from '@molecules/BackHeader';
import { FloatButton } from '@molecules/FloatButton';
import { Feedback } from '@organisms/Common/Feedback';
import { CauseDetailsInfo } from '@organisms/Common/CauseDetailsInfo';

import { Container, Content, Wrapper, FeedbackWrapper, AddFeedbackWrapper } from './styles';
import { ImageProps } from '@utils/image';
import ImageViewerFooter from '@molecules/ImageViewerFooter';

type CauseRouteScreenProp = RouteProp<OrganizationNavigatorParamsList, 'Cause'>;

type CauseNavigationScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootNavigatorParamsList, 'OrganizationStack'>,
  StackNavigationProp<OrganizationNavigatorParamsList, 'Cause'>
>;

export function Cause(): JSX.Element {
  const route = useRoute<CauseRouteScreenProp>();
  const navigation = useNavigation<CauseNavigationScreenProp>();

  const theme = useTheme();
  const rem = useRem();
  const { t } = useTranslation();

  const [isVisibleImageViewer, setIsVisibleImageViewer] = useState(false);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);

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

  const handlePressImage = (imageIndex: number) => {
    setIsVisibleImageViewer(true);
    setImageViewerIndex(imageIndex);
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
                  onPressImage={handlePressImage}
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
      {data?.feedbackImages && (
        <ImageView
          images={data?.feedbackImages?.map((element) => ({ uri: element.name }))}
          imageIndex={imageViewerIndex}
          visible={isVisibleImageViewer}
          FooterComponent={(props) => (
            <ImageViewerFooter
              imageIndex={props.imageIndex}
              total={data?.feedbackImages?.length ?? 0}
            />
          )}
          onRequestClose={() => setIsVisibleImageViewer(false)}
        />
      )}
    </Container>
  );
}
