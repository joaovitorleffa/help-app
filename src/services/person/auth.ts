import { CreatePersonDto } from '@dto/create-person-dto';
import { api } from '@services/api';

export const createPerson = (createPersonDto: CreatePersonDto) => {
  return api.post('/persons', createPersonDto).then((res) => res.data);
};
