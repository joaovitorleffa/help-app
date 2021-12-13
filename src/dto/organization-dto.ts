import { UserDto } from './user-dto';

interface CreateOrganizationDto {
  name: string;
  email: string;
  phoneNumber: string;
  cep: string;
  number: string;
  city: string;
  district: string;
  password: string;
}

interface OrganizationDto {
  id: number;
  name: string;
  phoneNumber: string;
  profileImage: string | null;
  description: string | null;
  cep: string;
  city: string;
  district: string;
  number: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthOrganizationDto {
  userData: UserDto;
  organizationData: OrganizationDto;
  accessToken: string;
}

export { OrganizationDto, AuthOrganizationDto, CreateOrganizationDto };
