import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { BorderlessButton } from 'react-native-gesture-handler';

import i18n from '@assets/locales/i18n';
import { yupResolver } from '@hookform/resolvers/yup';

import { Text } from '@atoms/Text';
import { RoundedAvatar } from '@molecules/RoundedAvatar';

import { Container, Content, Input, Left } from './styles';

interface CommentInputProps {
  photo?: string | null;
  onComment: (comment: string) => void;
}

const schema = Yup.object().shape({
  comment: Yup.string().max(250, i18n.t('errors.max_commentary')),
});

export function CommentInput({ photo, onComment }: CommentInputProps): JSX.Element {
  const theme = useTheme();
  const rem = useRem();
  const { t } = useTranslation();

  const inputRef = useRef<TextInput>({} as TextInput);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: { comment: string }) => {
    onComment(data.comment);
    reset();
    inputRef?.current?.blur();
  };

  return (
    <>
      {errors?.comment?.message && (
        <View
          style={{
            paddingBottom: 4,
            backgroundColor: theme.colors.background,
            paddingHorizontal: theme.spacing.grid,
          }}>
          <Text color={theme.colors.error} fontSize={rem(theme.fonts.size.xs)}>
            {errors.comment.message}
          </Text>
        </View>
      )}
      <Container>
        <Content>
          <Left>
            <RoundedAvatar uri={photo} size="sm" isDark={true} />
            <Controller
              name="comment"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <Input
                  ref={inputRef}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t('comment.placeholder')}
                  placeholderTextColor={theme.colors.title_secondary}
                  multiline
                />
              )}
            />
          </Left>
          <BorderlessButton onPress={handleSubmit(onSubmit)}>
            <Text color={theme.colors.primary} fontSize={rem(theme.fonts.size.xs)}>
              {t('common.publish')}
            </Text>
          </BorderlessButton>
        </Content>
      </Container>
    </>
  );
}
