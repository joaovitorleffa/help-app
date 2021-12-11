import { PersonDto } from '@dto/person-dto';
import { api } from '@services/api';

export const updateProfileImage = (data: FormData): Promise<PersonDto> => {
  return api.patch('/persons/edit/profile-image', data).then((res) => res.data);
};

export const show = (): Promise<PersonDto> => {
  return api.get('/persons/profile').then((res) => res.data);
};
