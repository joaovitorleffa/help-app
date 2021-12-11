import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';
import { LoginDto } from '@dto/login-dto';
import { RootNavigatorParamsList } from '@routes/types';

import { SignInTemplate } from '@templates/Common/SignInTemplate';

import { Container } from './styles';
import { useMutation } from 'react-query';
import { loginOrganization } from '@services/organization/auth.api';

type SignInScreenNavigationProp = StackNavigationProp<RootNavigatorParamsList, 'OrganizationStack'>;

export function SignIn(): JSX.Element {
  const { setOrganizationData } = useAuth();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const [isInvalid, setIsInvalid] = useState(false);

  const { mutate, isLoading } = useMutation(loginOrganization, {
    onSuccess: async (data) => {
      await setOrganizationData({
        organizationData: data.organization,
        userData: data.user,
        accessToken: data.accessToken,
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status) {
          setIsInvalid(true);
        }
      }
      console.log('[handleLogin] error:', error);
    },
  });

  const goToSignUp = () => {
    navigation.navigate('OrganizationStack', {
      screen: 'AuthStack',
      params: { screen: 'SignUpFirstStep' },
    });
  };

  return (
    <Container>
      <SignInTemplate
        isInvalid={isInvalid}
        goToSignUp={goToSignUp}
        handleLogin={mutate}
        isLoading={isLoading}
      />
    </Container>
  );
}
