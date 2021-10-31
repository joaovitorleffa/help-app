import React, { useCallback, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import { RouteProp, useRoute } from '@react-navigation/core';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { Alert, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import i18n from '@assets/locales/i18n';
import { useAuth } from '@hooks/useAuth';
import { getImageInfo } from '@utils/image';
import { OrganizationNavigatorParamsList } from '@routes/types';

import { Text } from '@atoms/Text';
import { Banner } from '@molecules/Banner';
import { Button } from '@molecules/Button';
import { BackHeader } from '@molecules/BackHeader';

import { Container, Wrapper, BannerContainer, Content, TextArea } from './styles';
import { useMutation, useQueryClient } from 'react-query';
import { updateProfile, updateProfileImage } from '@services/organization';
import { OrganizationDto } from '@dto/organization-dto';

type EditProfileScreenRouteProp = RouteProp<OrganizationNavigatorParamsList, 'EditProfile'>;

interface Data {
  description: string;
}

const schema = Yup.object().shape({
  description: Yup.string().nullable().max(400, i18n.t('errors.invalid_description')),
});

export function EditProfile(): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();
  const { params } = useRoute<EditProfileScreenRouteProp>();

  const { profileImage, description } = params;

  const [isFocused, setIsFocused] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<ImageInfo>({} as ImageInfo);

  const { organization, reconcileOrganizationData } = useAuth();

  const queryClient = useQueryClient();

  const { mutate: mutateImage, isLoading } = useMutation(updateProfileImage, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('organization-profile');
      showMessage({
        message: t('common.success'),
        description: t('common.successfully_altered_image'),
        type: 'success',
      });
    },
    onError: () => {
      showMessage({
        message: t('common.error'),
        description: t('errors.edit_profile_error'),
        type: 'danger',
      });
    },
  });

  const { mutate: mutateDescription, isLoading: isUpdatingDescription } = useMutation(
    updateProfile,
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('organization-profile');
        showMessage({
          message: t('common.success'),
          description: t('common.saved_information'),
          type: 'success',
        });
        reconcileOrganizationData(data);
      },
      onError: () => {
        showMessage({
          message: t('common.error'),
          description: t('errors.edit_profile_error'),
          type: 'danger',
        });
      },
    },
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const heightAnim = useSharedValue(0);

  const heightStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(heightAnim.value, [0, 1], [280, 0]),
    };
  });

  const updateImage = useCallback(async () => {
    const imageInfo = getImageInfo(newProfileImage, organization.name);

    const form = new FormData();
    const file = JSON.parse(JSON.stringify(imageInfo));
    form.append('file', file);

    mutateImage(form);
  }, [organization.name, newProfileImage, mutateImage]);

  const handleSelectImage = useCallback(async () => {
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
      setNewProfileImage(result);
    }
  }, [t]);

  const onSubmit = (data: Data) => {
    if (description !== data.description) {
      mutateDescription(data as OrganizationDto);
    }
  };

  useEffect(() => {
    if (Object.keys(newProfileImage).length) {
      updateImage();
    }
  }, [newProfileImage, updateImage]);

  useEffect(() => {
    if (isFocused) {
      heightAnim.value = withTiming(1, { duration: 200 });
    } else {
      heightAnim.value = withTiming(0, { duration: 200 });
    }
  }, [isFocused, heightAnim]);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <Container>
        <Content>
          <View>
            <Wrapper style={{ marginTop: 24 }}>
              <BackHeader title={t('edit_profile.edit_profile_title')} />
            </Wrapper>
            <Animated.View style={heightStyle}>
              <BannerContainer>
                <Banner
                  showContent={!isFocused}
                  uri={newProfileImage?.uri ? newProfileImage.uri : profileImage ?? ''}
                  onSelectImage={handleSelectImage}
                />
              </BannerContainer>
            </Animated.View>
            <Wrapper style={{ marginTop: 24 }}>
              <Controller
                control={control}
                name="description"
                defaultValue={description}
                render={({ field: { onChange, value } }) => (
                  <TextArea
                    multiline
                    value={value}
                    onChangeText={onChange}
                    isFocused={isFocused}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={t('common.description')}
                    error={!!errors?.description?.message}
                    placeholderTextColor={theme.colors.placeholder}
                  />
                )}
              />
              {!!errors?.description?.message && (
                <Text fontSize={rem(0.65)} color={theme.colors.error}>
                  {errors.description.message}
                </Text>
              )}
            </Wrapper>
          </View>
          <Wrapper>
            <Button
              color={theme.colors.button}
              textColor={theme.colors.title_secondary}
              title={t('common.save')}
              onPress={handleSubmit(onSubmit)}
            />
          </Wrapper>
          <Spinner
            visible={isLoading || isUpdatingDescription}
            textContent={t('common.loading')}
            textStyle={{ color: theme.colors.title_secondary }}
          />
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  );
}
