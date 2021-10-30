import { AllCausesDto } from '@dto/cause-dto';
import { Pagination } from '@dto/pagination-dto';
import { api } from '@services/api';

export const getCauses = async ({ queryKey }): Promise<Pagination<AllCausesDto>> => {
  const [_key, { page, limit }] = queryKey;

  return api.get('/causes', { params: { page, limit: limit ?? 10 } }).then((res) => res.data);
};

export const updateFavoriteCause = async (cause: AllCausesDto): Promise<AllCausesDto> => {
  return api.put(`/persons/favorite/cause/${cause.id}`);
};

export const getFavorites = async (): Promise<Omit<AllCausesDto, 'isFavorite'>[]> => {
  return api.get('/persons/favorite').then((res) => res.data);
};
