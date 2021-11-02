import { CommentDto, CreateComment } from '@dto/comments-dto';
import { api } from './api';

export const createComment = (data: CreateComment): Promise<void> => {
  return api.post('/cause-comments', data);
};

export const getTwoComments = (causeId: number): Promise<CommentDto> => {
  return api.get(`/cause-comments/${causeId}?limit=2`).then((res) => res.data);
};

export const getComments = (causeId: number): Promise<CommentDto> => {
  return api.get(`/cause-comments/${causeId}`).then((res) => res.data);
};
