import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { showMessage } from 'react-native-flash-message';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback } from 'react-native';

import { api } from '@services/api';
import i18n from '@assets/locales/i18n';
import { UpdateCauseDto } from '@dto/update-cause-dto';
import { OrganizationNavigatorParamsList } from '@routes/types';

import { Button } from '@molecules/Button';
import { BackHeader } from '@molecules/BackHeader';
import { AddCauseForm } from '@organisms/Organization/AddCauseForm';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string()
    .required(i18n.t('errors.fill_title'))
    .max(30, i18n.t('errors.max_title', { caracteres: 30 })),
  description: Yup.string()
    .required(i18n.t('errors.fill_description'))
    .max(200, i18n.t('errors.max_description', { caracteres: 200 })),
  endAt: Yup.string().required(i18n.t('errors.fill_end_at')),
  type: Yup.string().required(i18n.t('errors.fill_type')),
});

type EditCauseRouteProp = RouteProp<OrganizationNavigatorParamsList, 'EditCause'>;

export function EditCause(): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<EditCauseRouteProp>();

  const id = useRef(route.params.id).current;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const editCause = async (data: UpdateCauseDto) => {
    try {
      await api.post(`causes/${id}`, data);
      showMessage({
        message: t('common.success'),
        description: t('edit_cause.updated_cause_successfully'),
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      console.log('[editCause] error:', error);
      showMessage({
        message: t('common.error'),
        description: t('errors.edit_cause_error'),
        type: 'danger',
      });
    }
  };

  const onSubmit = (formData: UpdateCauseDto) => {
    editCause(formData);
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <Content>
            <BackHeader title={t('edit_cause.title')} />
            <AddCauseForm defaultValues={route.params} control={control} errors={errors} />
            <Button
              style={{ marginTop: rem(1.2) }}
              title={t('common.edit')}
              onPress={handleSubmit(onSubmit)}
              color={theme.colors.primary}
              textColor={theme.colors.title_secondary}
            />
          </Content>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
