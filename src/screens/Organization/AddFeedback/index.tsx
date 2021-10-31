import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { Alert, Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import i18n from '@assets/locales/i18n';
import { GetImageInfo, getImageInfo, ImageProps } from '@utils/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrganizationNavigatorParamsList } from '@routes/types';

import { Button } from '@molecules/Button';
import { BackHeader } from '@molecules/BackHeader';
import { InputForm } from '@molecules/Form/InputForm';
import { createFeedback } from '@services/organization';
import { FeedbackPhoto } from '@molecules/FeedbackPhoto';
import { showMessage } from 'react-native-flash-message';

import { Container, Content, Photos } from './styles';

const schema = Yup.object().shape({
  feedback: Yup.string()
    .required(i18n.t('errors.fill_feedback'))
    .max(450, i18n.t('errors.max_feedback')),
});

interface FormData {
  feedback: string;
}

type AddFeedbackRouteProp = RouteProp<OrganizationNavigatorParamsList, 'AddFeedback'>;

export function AddFeedback(): JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();
  const route = useRoute<AddFeedbackRouteProp>();
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const { id, feedback, images: imageParams } = route.params;

  const [images, setImages] = useState<Array<ImageProps>>(
    imageParams ?? [{} as ImageProps, {} as ImageProps, {} as ImageProps],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { mutate, isLoading } = useMutation(createFeedback, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('cause');
      showMessage({
        message: t('common.success'),
        description: t('add_feedback.add_feedback_success'),
        type: 'success',
      });
      navigation.goBack();
    },
  });

  const selectImage = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert(t('common.sorry'), t('common.media_permission'));
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      return result;
    }
  }, [t]);

  const handleSelectImage = useCallback(
    async (index: number) => {
      const selectedImage = await selectImage();
      if (selectedImage) {
        const prevImages = [...images];
        prevImages[index] = selectedImage;
        setImages(prevImages);
      }
    },
    [selectImage, images],
  );

  const dismissKeyboard = () => Keyboard.dismiss();

  const onSubmit = (data: FormData) => {
    const filteredImages = images.filter((element) => Object.keys(element).length > 0);

    const imagesInfo: Array<GetImageInfo> = [];
    for (let i = 0; i < filteredImages.length; i++) {
      if (imageParams) {
        if (filteredImages[i].uri === imageParams[i].uri) {
          continue;
        }
      }
      imagesInfo.push(getImageInfo(filteredImages[i]));
    }

    if (imagesInfo.length === 0 && data.feedback === feedback) {
      return navigation.goBack();
    }

    mutate({ ...data, id, images: imagesInfo });
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <Content>
          <View>
            <BackHeader title={t('add_feedback.title')} />

            <InputForm
              control={control}
              defaultValue={feedback ?? ''}
              error={errors?.feedback?.message}
              name="feedback"
              inputType="textArea"
              placeholder={t('add_feedback.feedback_placeholder')}
            />
            <Photos>
              {images.map((element, index) => (
                <FeedbackPhoto
                  key={index}
                  uri={element?.uri}
                  onPress={() => handleSelectImage(index)}
                  style={{ marginBottom: 8 }}
                />
              ))}
            </Photos>
          </View>
          <Button
            isLoading={isLoading}
            color={theme.colors.button}
            textColor={theme.colors.title_secondary}
            title={t('common.save')}
            onPress={handleSubmit(onSubmit)}
          />
        </Content>
      </TouchableWithoutFeedback>
    </Container>
  );
}
