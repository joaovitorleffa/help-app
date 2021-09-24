import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback } from 'react-native';

import i18n from '@assets/locales/i18n';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@molecules/Button';
import { AddCauseForm } from '@organisms/Organization/AddCauseForm';

import { Container, Content } from './styles';
import { BackHeader } from '@molecules/BackHeader';

const schema = Yup.object().shape({
  title: Yup.string()
    .required(i18n.t('errors.fill_title'))
    .max(30, i18n.t('errors.max_title', { caracteres: 30 })),
  description: Yup.string()
    .required(i18n.t('errors.fill_description'))
    .max(200, i18n.t('errors.max_description', { caracteres: 200 })),
  end_at: Yup.string().required(i18n.t('errors.fill_end_at')),
  type: Yup.string().required(i18n.t('errors.fill_type')),
});

interface Data {
  title: string;
  description: string;
  end_at: string;
  type: string;
}

export function AddCause(): JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();
  const rem = useRem();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (formData: Data) => {
    console.log({ formData });
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding">
          <Content>
            <BackHeader title={t('create_cause.title')} />
            <AddCauseForm control={control} errors={errors} />
            <Button
              style={{ marginTop: rem(1.2) }}
              title={t('common.register')}
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
