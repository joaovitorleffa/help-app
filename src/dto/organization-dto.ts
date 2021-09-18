import { UserDto } from './user-dto';

interface OrganizationDto {
  id: number;
  name: string;
  phoneNumber: string;
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

export { OrganizationDto, AuthOrganizationDto };
