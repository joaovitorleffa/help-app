import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { showMessage } from 'react-native-flash-message';
import { Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback } from 'react-native';

import { api } from '@services/api';
import i18n from '@assets/locales/i18n';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@molecules/Button';
import { BackHeader } from '@molecules/BackHeader';
import { CreateCauseDto } from '@dto/create-cause-dto';
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

export function AddCause(): JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();
  const rem = useRem();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const addCause = async (data: CreateCauseDto) => {
    try {
      console.log(data);
      const res = await api.post('causes', data);
      console.log(res);
      showMessage({
        message: t('common.success'),
        description: t('create_cause.created_cause_successfully'),
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      console.log('[addCause] error:');
      showMessage({
        message: t('common.error'),
        description: t('errors.add_cause_error'),
        type: 'danger',
      });
    }
  };

  const onSubmit = (formData: CreateCauseDto) => {
    addCause(formData);
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <Content>
            <BackHeader title={t('create_cause.title')} />
            <AddCauseForm control={control} errors={errors} />
            <Button
              style={{ marginTop: rem(1.2) }}
              title={t('common.register')}
              onPress={handleSubmit(onSubmit)}
              color={theme.colors.button}
              textColor={theme.colors.title_secondary}
            />
          </Content>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
