import React, { useState } from 'react';

import { SignInTemplate } from '@templates/Common/SignInTemplate';

import { Container } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { PersonNavigatorParamsList } from '@routes/types';
import { useNavigation } from '@react-navigation/core';
import { LoginDto } from '@dto/login-dto';
import { loginPerson } from '@services/person';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useAuth } from '@hooks/useAuth';

type PersonSignInNavigationScreenProp = StackNavigationProp<
  PersonNavigatorParamsList,
  'PersonSignIn'
>;

export function SignIn(): JSX.Element {
  const navigation = useNavigation<PersonSignInNavigationScreenProp>();
  const { setPersonData } = useAuth();

  const { mutate, isLoading } = useMutation(loginPerson, {
    onSuccess: async (data) => {
      await setPersonData(data);
      navigation.reset({ index: 0, routes: [{ name: 'PersonHome' }] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status) {
          setIsInvalid(true);
        }
      }
    },
  });

  const [isInvalid, setIsInvalid] = useState(false);

  const goToSignUp = () => navigation.navigate('PersonSignUp');

  const handleLogin = (loginDto: LoginDto) => {
    mutate(loginDto);
  };

  return (
    <Container>
      <SignInTemplate
        isInvalid={isInvalid}
        goToSignUp={goToSignUp}
        handleLogin={handleLogin}
        isLoading={isLoading}
      />
    </Container>
  );
}
