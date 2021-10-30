import React, { useState, useEffect, useCallback } from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { Alert, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useQuery } from 'react-query';
import { showMessage } from 'react-native-flash-message';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

import { useAuth } from '@hooks/useAuth';
import { getImageInfo } from '@utils/image';
import { getFavorites } from '@services/person/cause.api';
import { show, updateProfileImage } from '@services/person';

import { Text } from '@atoms/Text';
import { ProfileData } from '@organisms/Person/ProfileData';
import { CauseSecondary } from '@organisms/Common/CauseSecondary';

import { Container, Content } from './styles';

export function Profile(): JSX.Element {
  const { t } = useTranslation();
  const rem = useRem();
  const theme = useTheme();
  const { person, user, reconcilePersonData, clearAuthData } = useAuth();

  const [newProfileImage, setNewProfileImage] = useState<ImageInfo>({} as ImageInfo);

  const { data } = useQuery('personProfile', show);

  const { data: causes } = useQuery('personFavoriteCauses', getFavorites);

  const { mutate } = useMutation(updateProfileImage, {
    onSuccess: (data) => {
      reconcilePersonData(data);
      showMessage({ message: t('common.successfully_altered_image'), type: 'success' });
    },
    onError: () => {
      setNewProfileImage({} as ImageInfo);
      showMessage({ message: t('errors.update_profile_image'), type: 'danger' });
    },
  });

  const handleLogout = () => {
    clearAuthData();
  };

  const updateImage = useCallback(async () => {
    const imageInfo = getImageInfo(newProfileImage, person.name);

    const form = new FormData();
    const file = JSON.parse(JSON.stringify(imageInfo));
    form.append('file', file);

    mutate(form);
  }, [newProfileImage, mutate, person.name]);

  const handleSelectProfileImage = async () => {
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
  };

  const onPress = () => {};

  const renderItem = useCallback(
    ({ item }) => <CauseSecondary cause={item} onPress={onPress} removeOption />,
    [],
  );

  useEffect(() => {
    if (Object.keys(newProfileImage).length) {
      updateImage();
    }
  }, [newProfileImage, updateImage]);

  return (
    <Container>
      <Content>
        <ProfileData
          name={person.name}
          email={user.email}
          handleLogout={handleLogout}
          handleSelectProfileImage={handleSelectProfileImage}
          profileImageUri={
            newProfileImage?.uri ? newProfileImage.uri : data?.profileImage ?? undefined
          }
        />
        <Text
          fontFamily="bold"
          fontSize={rem(theme.fonts.size.lg)}
          style={{ marginTop: rem(1), marginBottom: rem(0.8) }}>
          {t('common.saved')}
        </Text>
        <FlatList
          data={causes}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text
              fontSize={rem(theme.fonts.size.sm)}
              style={{ marginTop: rem(1), textAlign: 'center' }}>
              {t('common.no_saved_causes')}
            </Text>
          }
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
        />
      </Content>
    </Container>
  );
}
