import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { Text } from '@atoms/Text';
import { FooterText } from '@molecules/FooterText';
import { SectionHeader } from '@molecules/SectionHeader';
import { FormSignIn } from '@organisms/Common/Forms/FormSignIn';

import { Container, Header } from './styles';
import { LoginDto } from '@dto/login-dto';
import KeyboardShift from '@atoms/KeyboardShift';

interface SignInTemplateProps {
  isInvalid?: boolean;
  goToSignUp: () => void;
  handleLogin: (data: LoginDto) => void;
  isLoading?: boolean;
}

export function SignInTemplate({
  isInvalid = false,
  isLoading = false,
  goToSignUp,
  handleLogin,
}: SignInTemplateProps): JSX.Element {
  const { t } = useTranslation();
  const rem = useRem();
  const theme = useTheme();

  const onSubmit = (data: LoginDto) => {
    handleLogin(data);
  };

  return (
    <KeyboardShift>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <SectionHeader title={t('sign_in.welcome')} subtitle={t('sign_in.subtitle')} isDark />
            {isInvalid && (
              <Text fontSize={rem(0.8)} color={theme.colors.error} style={{ marginTop: rem(1.2) }}>
                {t('sign_in.invalid_login')}
              </Text>
            )}
          </Header>
          <FormSignIn onSignIn={onSubmit} isLoading={isLoading} />

          <FooterText
            text={t('sign_in.no_have_account')}
            touchable={t('common.register')}
            onTouch={goToSignUp}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardShift>
  );
}
