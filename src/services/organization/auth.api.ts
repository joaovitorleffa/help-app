import { LoginDto, OrganizationLoginResponseDto } from '@dto/login-dto';
import { CreateOrganizationDto } from '@dto/organization-dto';
import { api } from '@services/api';

export const createOrganization = async (data: CreateOrganizationDto): Promise<void> => {
  return await api.post('/organizations', data).then((res) => res.data);
};

export const loginOrganization = async (
  loginDto: LoginDto,
): Promise<OrganizationLoginResponseDto> => {
  return await api.post('/auth/organization/login', loginDto).then((res) => res.data);
};
