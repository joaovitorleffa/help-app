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

type SignInScreenNavigationProp = StackNavigationProp<RootNavigatorParamsList, 'OrganizationStack'>;

export function SignIn(): JSX.Element {
  const { setOrganizationData } = useAuth();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const [isInvalid, setIsInvalid] = useState(false);

  const handleLogin = async (data: LoginDto) => {
    try {
      const response = await api.post('/auth/organization/login', data);
      await setOrganizationData({
        organizationData: response.data.organization,
        userData: response.data.user,
        accessToken: response.data.accessToken,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status) {
          setIsInvalid(true);
        }
      }
      console.log('[handleLogin] error:', error);
    }
  };

  const goToSignUp = () => {
    navigation.navigate('OrganizationStack', {
      screen: 'AuthStack',
      params: { screen: 'SignUpFirstStep' },
    });
  };

  return (
    <Container>
      <SignInTemplate isInvalid={isInvalid} goToSignUp={goToSignUp} handleLogin={handleLogin} />
    </Container>
  );
}
