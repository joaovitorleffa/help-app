import { LoginDto, OrganizationLoginResponseDto } from '@dto/login-dto';
import { api } from '@services/api';

// export const createOrganization = async (createPersonDto: CreatePersonDto): Promise<any> => {
//     return await api.post('/persons', createPersonDto).then((res) => res.data);
//   };

export const loginOrganization = async (
  loginDto: LoginDto,
): Promise<OrganizationLoginResponseDto> => {
  return await api.post('/auth/organization/login', loginDto).then((res) => res.data);
};
