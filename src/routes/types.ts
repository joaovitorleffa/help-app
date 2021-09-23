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
  EditProfile: { profileImage: string | null; description: string | null };
  AddCause: undefined;
};

export type OrganizationAuthNavigatorParamsList = {
  Initial: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: FirstStepData;
  SignUpThirdStep: FirstStepData & SecondStepData;
};

export type OrganizationAppNavigatorParamsList = {
  CauseList: undefined;
  Profile: undefined;
};

export type PersonNavigatorParamsList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
};
