import { CreatePersonDto } from '@dto/create-person-dto';
import { LoginDto, PersonLoginResponseDto } from '@dto/login-dto';
import { api } from '@services/api';

export const createPerson = async (createPersonDto: CreatePersonDto): Promise<any> => {
  return await api.post('/persons', createPersonDto).then((res) => res.data);
};

export const loginPerson = async (loginDto: LoginDto): Promise<PersonLoginResponseDto> => {
  return await api.post('/auth/person/login', loginDto).then((res) => res.data);
};
