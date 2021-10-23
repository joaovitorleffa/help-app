type UserType = 'organization' | 'person';

export enum UserTypeEnum {
  ORGANIZATION = 'organization',
  PERSON = 'person',
}

export interface UserDto {
  id: number;
  email: string;
  userType: UserTypeEnum;
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt: string;
}
