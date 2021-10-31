import React, { useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { showMessage } from 'react-native-flash-message';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';

import i18n from '@assets/locales/i18n';
import { createPerson } from '@services/person';
import { PersonNavigatorParamsList, RootNavigatorParamsList } from '@routes/types';

import { Button } from '@molecules/Button';
import KeyboardShift from '@atoms/KeyboardShift';
import { FooterText } from '@molecules/FooterText';
import { InputForm } from '@molecules/Form/InputForm';
import { SectionHeader } from '@molecules/SectionHeader';

import { StackNavigationProp } from '@react-navigation/stack';

import { Container, Content, Header } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().min(5, i18n.t('errors.min_name')).required(i18n.t('errors.fill_name')),
  email: Yup.string().email(i18n.t('errors.invalid_email')).required(i18n.t('errors.fill_email')),
  password: Yup.string().min(8, i18n.t('errors.min_password')).required('errors.fill_password'),
  passwordConfirm: Yup.string().required(i18n.t('errors.fill_confirm_password')),
});

type PersonSignUpNavigationScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootNavigatorParamsList, 'PersonStack'>,
  StackNavigationProp<PersonNavigatorParamsList, 'PersonSignUp'>
>;

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export function SignUp(): JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation<PersonSignUpNavigationScreenProp>();
  const rem = useRem();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { mutate, isLoading } = useMutation(createPerson, {
    onSuccess: () => {
      navigation.replace('Success', {
        title: t('sign_up.created_account_success'),
        text: t('sign_up.created_account_success_message'),
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 400) {
          let e = '';
          for (e of error?.response?.data?.message) {
            showMessage({ message: t(`errors.${e}`), type: 'danger' });
          }
        }
      }
    },
  });

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const goToSignIn = () => navigation.navigate('PersonSignIn');

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  useEffect(() => {
    if (password !== passwordConfirm) {
      setError('passwordConfirm', {
        type: 'manual',
        message: i18n.t('errors.different_passwords'),
      });
    } else {
      clearErrors('password');
      clearErrors('passwordConfirm');
    }
  }, [passwordConfirm]);

  return (
    <KeyboardShift>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Content>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <Header>
                <SectionHeader
                  title={t('sign_up.create_title')}
                  subtitle={t('sign_up.create_message_secondary')}
                  isDark
                />
              </Header>
              <View>
                <InputForm
                  control={control}
                  name="name"
                  autoCapitalize="words"
                  autoCompleteType="name"
                  error={errors?.name?.message}
                  placeholder={t('common.name')}
                />
                <InputForm
                  style={{ marginTop: rem(0.4) }}
                  control={control}
                  name="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  error={errors?.email?.message}
                  placeholder={t('common.email')}
                />
                <InputForm
                  style={{ marginTop: rem(0.4) }}
                  control={control}
                  name="password"
                  error={errors?.password?.message}
                  placeholder={t('common.password')}
                />
                <InputForm
                  style={{ marginTop: rem(0.4) }}
                  control={control}
                  name="passwordConfirm"
                  error={errors?.passwordConfirm?.message}
                  placeholder={t('common.confirm_password')}
                />
                <Button
                  isLoading={isLoading}
                  style={{ marginTop: rem(1.2) }}
                  title="Cadastrar"
                  color={theme.colors.button}
                  textColor={theme.colors.title_secondary}
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
              <SafeAreaView style={{ marginBottom: 20 }}>
                <FooterText
                  text={t('common.already_have_an_account')}
                  touchable={t('common.entry')}
                  onTouch={goToSignIn}
                />
              </SafeAreaView>
            </View>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardShift>
  );
}
