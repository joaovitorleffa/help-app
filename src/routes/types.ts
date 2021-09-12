import { FirstStepData, SecondStepData } from '@dto/sign-up-dto';
import { NavigatorScreenParams } from '@react-navigation/core';

export type RootNavigatorParamsList = {
  Greeting: undefined;
  Success: {
    title: string;
    text: string;
  };
  OrganizationStack: NavigatorScreenParams<OrganizationNavigatorParamsList>;
  PersonStack: NavigatorScreenParams<PersonNavigatorParamsList>;
};

export type OrganizationNavigatorParamsList = {
  AuthStack: NavigatorScreenParams<OrganizationAuthNavigatorParamsList>;
  AppStack: NavigatorScreenParams<OrganizationAppNavigatorParamsList>;
};

export type OrganizationAuthNavigatorParamsList = {
  Initial: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: FirstStepData;
  SignUpThirdStep: FirstStepData & SecondStepData;
};

export type OrganizationAppNavigatorParamsList = {
  Home: undefined;
};

export type PersonNavigatorParamsList = {
  Initial: undefined;
  SignIn: undefined;
  SignUp: undefined;
};
