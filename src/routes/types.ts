import { NavigatorScreenParams } from '@react-navigation/core';

import { UpdateCauseDto } from '@dto/update-cause-dto';
import { FirstStepData, SecondStepData } from '@dto/sign-up-dto';
import { ImageProps } from '@utils/image';

export type RootNavigatorParamsList = {
  Greeting: undefined;
  Success: {
    title: string;
    text: string;
  };
  ImageViewer: { images: Array<string>; selectedIndex?: number };
  OrganizationStack: NavigatorScreenParams<OrganizationNavigatorParamsList>;
  PersonStack: NavigatorScreenParams<PersonNavigatorParamsList>;
};

export type OrganizationNavigatorParamsList = {
  AuthStack: NavigatorScreenParams<OrganizationAuthNavigatorParamsList>;
  AppStack: NavigatorScreenParams<OrganizationAppNavigatorParamsList>;
  EditProfile: { profileImage: string | null; description: string | null };
  AddCause: undefined;
  EditCause: UpdateCauseDto;
  AddFeedback: { id: number; feedback?: string; images?: Array<ImageProps> };
  Cause: UpdateCauseDto;
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
  PersonHome: undefined;
  PersonAppTab: NavigatorScreenParams<PersonAppTabNavigationParamsList>;
  PersonCauseDetails: {
    id: number;
    title: string;
    ongName: string;
    type: 'donation' | 'voluntary_work';
    description: string;
    endAt: string;
  };
  PersonInitial: undefined;
  PersonSignIn: undefined;
  PersonSignUp: undefined;
};

export type PersonAppTabNavigationParamsList = {
  PersonProfile: undefined;
  PersonCauses: undefined;
};
