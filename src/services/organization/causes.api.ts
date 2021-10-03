import { CauseDto } from '@dto/cause-dto';
import { Pagination } from '@dto/pagination-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { api } from '../api';

const getCauses = ({ queryKey }): Promise<Pagination<CauseDto>> => {
  const [_key, { page, limit, type, situation }] = queryKey;

  return api
    .get('/causes/self', { params: { page, limit: limit ?? 10, type, situation } })
    .then((response) => response.data);
};

const updateCause = (updateCause: UpdateCauseDto): Promise<CauseDto> => {
  const { id } = updateCause;
  console.log(updateCause);
  return api.put(`/causes/${id}`, updateCause).then((response) => response.data);
};

export { getCauses, updateCause };
