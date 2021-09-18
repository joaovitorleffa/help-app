type UserType = 'organization' | 'person';

enum UserTypeEnum {
  ORGANIZATION = 'organization',
  person = 'person',
}

interface UserDto {
  id: number;
  email: string;
  userType: UserTypeEnum;
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt: string;
}

export { UserDto, UserTypeEnum };
