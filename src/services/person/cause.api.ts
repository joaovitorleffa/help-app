import { AllCausesDto } from '@dto/cause-dto';
import { Pagination } from '@dto/pagination-dto';
import { api } from '@services/api';

export const getCauses = async ({ queryKey }): Promise<Pagination<AllCausesDto>> => {
  const [_key, { page, limit }] = queryKey;

  return api.get('/causes', { params: { page, limit: limit ?? 10 } }).then((res) => res.data);
};
