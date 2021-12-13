import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Alert, Keyboard, Linking, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { useRem } from 'responsive-native';
import { Skeleton } from '@motify/skeleton';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import ImageView from 'react-native-image-viewing';
import { showMessage } from 'react-native-flash-message';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';

import { useAuth } from '@hooks/useAuth';
import { createComment } from '@services/comments.api';
import { PersonNavigatorParamsList } from '@routes/types';
import { getCauseDetails } from '@services/person/cause.api';

import { Text } from '@atoms/Text';
import KeyboardShift from '@atoms/KeyboardShift';
import { BackHeader } from '@molecules/BackHeader';
import { AvatarPhoto } from '@molecules/AvatarPhoto';
import { Comments } from '@organisms/Common/Comments';
import { Feedback } from '@organisms/Common/Feedback';
import { CommentInput } from '@molecules/CommentInput';
import ImageViewerFooter from '@molecules/ImageViewerFooter';
import { FloatButtonSocial } from '@molecules/FloatButtonSocial';
import { CauseDetailsInfo } from '@organisms/Common/CauseDetailsInfo';

import { Container, Wrapper, FeedbackWrapper, Row, Info } from './styles';

type CauseDetailsScreenProp = RouteProp<PersonNavigatorParamsList, 'PersonCauseDetails'>;

type CauseDetailsNavigationScreenProp = StackNavigationProp<
  PersonNavigatorParamsList,
  'PersonCauseDetails'
>;

export function CauseDetails(): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<CauseDetailsNavigationScreenProp>();
  const route = useRoute<CauseDetailsScreenProp>();
  const { person, user } = useAuth();
  const queryClient = useQueryClient();
  const { id, title, ongName, endAt, description, type } = route.params;

  const [isVisibleImageViewer, setIsVisibleImageViewer] = useState(false);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);

  const { data, isLoading } = useQuery(['personCauseDetails', id], () => getCauseDetails(id));

  const { mutate } = useMutation(createComment, {
    onError: () => {
      showMessage({
        message: t('common.error'),
        description: t('errors.create_commentary'),
        type: 'danger',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('causeTwoComments');
      await queryClient.invalidateQueries('causeComments');
    },
  });

  const handlePressImage = (imageIndex: number) => {
    setIsVisibleImageViewer(true);
    setImageViewerIndex(imageIndex);
  };

  const handleOngDetails = () => {
    if (data) {
      navigation.navigate('PersonOngDetails', {
        id,
        name: data?.organization.name,
        email: data.organization.user.email,
        image: data.organization.profileImage,
        phone: data.organization.phoneNumber,
        cep: data.organization.cep,
        description: data.organization.description,
        address: `${data?.organization.city.toUpperCase()} - ${data?.organization.district}, ${
          data?.organization.number
        }`,
      });
    }
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

  const handleComment = (comment: string) => {
    mutate({ comment, causeId: id, userId: user.id });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardShift>
        <Container>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}>
            <Wrapper>
              <BackHeader title={title} />
              <Row>
                <Skeleton show={isLoading}>
                  {data?.organization.profileImage ? (
                    <SharedElement id={`item.${id}.photo`}>
                      <AvatarPhoto
                        uri={data?.organization.profileImage ?? ''}
                        onPress={handleOngDetails}
                      />
                    </SharedElement>
                  ) : (
                    <AvatarPhoto
                      uri={data?.organization.profileImage ?? ''}
                      onPress={handleOngDetails}
                    />
                  )}
                </Skeleton>
                <Info>
                  <Text fontFamily="bold" fontSize={rem(theme.fonts.size.sm)}>
                    {ongName}
                  </Text>
                  <Skeleton show={isLoading}>
                    <Text fontFamily="bold" fontSize={rem(theme.fonts.size.xs)}>
                      {data?.organization.city.toUpperCase()} - {data?.organization.district},{' '}
                      {data?.organization.number}
                    </Text>
                  </Skeleton>
                </Info>
              </Row>
              <CauseDetailsInfo endAt={endAt} description={description} type={type} />
              <View style={{ marginTop: 16 }}>
                <Comments causeId={id} />
              </View>
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

        <CommentInput photo={person.profileImage} onComment={handleComment} />
      </KeyboardShift>
    </TouchableWithoutFeedback>
  );
}
