import { NavigatorScreenParams } from '@react-navigation/core';

export type RootNavigatorParamsList = {
  Greeting: undefined;
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
  SignUpSecondStep: undefined;
  SignUpThirdStep: undefined;
};

export type OrganizationAppNavigatorParamsList = {
  Home: undefined;
};

export type PersonNavigatorParamsList = {
  Initial: undefined;
  SignIn: undefined;
  SignUp: undefined;
};
