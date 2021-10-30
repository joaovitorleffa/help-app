import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Alert, Linking, ScrollView } from 'react-native';
import { useRem } from 'responsive-native';
import { Skeleton } from '@motify/skeleton';
import { useTheme } from 'styled-components';
import ImageView from 'react-native-image-viewing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/core';

import { PersonNavigatorParamsList } from '@routes/types';
import { getCauseDetails } from '@services/person/cause.api';

import { Text } from '@atoms/Text';
import { BackHeader } from '@molecules/BackHeader';
import { Feedback } from '@organisms/Common/Feedback';
import ImageViewerFooter from '@molecules/ImageViewerFooter';
import { FloatButtonSocial } from '@molecules/FloatButtonSocial';
import { CauseDetailsInfo } from '@organisms/Common/CauseDetailsInfo';

import { Container, Wrapper, FeedbackWrapper } from './styles';
import { useTranslation } from 'react-i18next';

type CauseDetailsScreenProp = RouteProp<PersonNavigatorParamsList, 'PersonCauseDetails'>;

export function CauseDetails(): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();
  const route = useRoute<CauseDetailsScreenProp>();

  const { id, title, ongName, endAt, description, type } = route.params;

  const [isVisibleImageViewer, setIsVisibleImageViewer] = useState(false);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);

  const { data, isLoading } = useQuery(['personCauseDetails', id], () => getCauseDetails(id));

  const handlePressImage = (imageIndex: number) => {
    setIsVisibleImageViewer(true);
    setImageViewerIndex(imageIndex);
  };

  const handleWhatsapp = () => {
    if (data?.organization.phoneNumber) {
      try {
        Linking.openURL(
          `https://wa.me/${data?.organization.phoneNumber}/?text=${t('common.whatsapp_message', {
            cause: title,
          })}`,
        );
      } catch {
        Alert.alert(t('errors.whatsapp'));
      }
    } else {
      Alert.alert(t('errors.whatsapp'));
    }
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        <Wrapper>
          <BackHeader title={title} />
          <Text
            fontFamily="bold"
            fontSize={rem(theme.fonts.size.sm)}
            style={{ marginBottom: rem(1) }}>
            {ongName}
          </Text>
          <CauseDetailsInfo endAt={endAt} description={description} type={type} />
        </Wrapper>

        {data?.feedbackImages && (
          <Skeleton show={isLoading}>
            <FeedbackWrapper>
              <Feedback
                feedback={data.feedback ?? ''}
                images={data.feedbackImages}
                onPressImage={handlePressImage}
              />
            </FeedbackWrapper>
          </Skeleton>
        )}
      </ScrollView>

      {data?.feedbackImages && (
        <ImageView
          images={data?.feedbackImages.map((element) => ({ uri: element.name }))}
          imageIndex={imageViewerIndex}
          visible={isVisibleImageViewer}
          FooterComponent={(props) => (
            <ImageViewerFooter
              imageIndex={props.imageIndex}
              total={data.feedbackImages?.length ?? 0}
            />
          )}
          onRequestClose={() => setIsVisibleImageViewer(false)}
        />
      )}
      <SafeAreaView>
        <FloatButtonSocial icon="whatsapp" onPress={handleWhatsapp} />
      </SafeAreaView>
    </Container>
  );
}
