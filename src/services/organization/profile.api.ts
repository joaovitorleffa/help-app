import { OrganizationDto } from '@dto/organization-dto';
import { api } from '@services/api';

const getProfile = (): Promise<OrganizationDto> =>
  api.get('/organizations/profile').then((res) => res.data);

const updateProfileImage = (data: FormData): Promise<void> =>
  api.patch('/organizations/edit/profile-image', data);

const updateProfile = (data: OrganizationDto): Promise<OrganizationDto> =>
  api.put('/organizations/edit', data).then((res) => res.data);

export { getProfile, updateProfileImage, updateProfile };
