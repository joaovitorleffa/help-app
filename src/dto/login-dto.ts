import { OrganizationDto } from './organization-dto';
import { PersonDto } from './person-dto';
import { UserDto } from './user-dto';

export interface LoginDto {
  email: string;
  password: string;
}

export interface PersonLoginResponseDto {
  person: PersonDto;
  user: UserDto;
  accessToken: string;
}

export interface OrganizationLoginResponseDto {
  organization: OrganizationDto;
  user: UserDto;
  accessToken: string;
}
