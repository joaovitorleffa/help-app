import { CauseDto } from '@dto/cause-dto';
import { Pagination } from '@dto/pagination-dto';
import { UpdateCauseDto } from '@dto/update-cause-dto';

import { api } from '../api';

const getCauses = ({ queryKey }): Promise<Pagination<CauseDto>> => {
  const [_key, { page, limit, type, situation }] = queryKey;

  return api
    .get('/causes/self', { params: { page, limit: limit ?? 10, type, situation } })
    .then((res) => res.data);
};

const getCauseById = (id: number): Promise<CauseDto> => {
  return api.get(`/causes/${id}`).then((res) => res.data);
};

const updateCause = (updateCause: UpdateCauseDto): Promise<CauseDto> => {
  const { id } = updateCause;
  return api.put(`/causes/${id}`, updateCause).then((res) => res.data);
};

const createFeedback = (createFeedback: {
  id: number;
  feedback: string;
  images: Array<any>;
}): Promise<CauseDto> => {
  const { id, feedback, images } = createFeedback;

  const form = new FormData();
  form.append('feedback', feedback);
  for (const image of images) {
    if (image) {
      form.append('files', image);
    }
  }

  return api.put(`/causes/${id}/add/feedback`, form).then((res) => res.data);
};

export { getCauses, getCauseById, updateCause, createFeedback };
