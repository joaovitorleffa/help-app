import { OrganizationDto } from './organization-dto';
import { PersonDto } from './person-dto';

export interface CreateComment {
  comment: string;
  causeId: number;
  userId: number;
}

export interface CommentResultDto {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    userType: 'organization' | 'person';
    organization: OrganizationDto;
    person: PersonDto;
  };
}

export interface CommentDto {
  total: number;
  results: CommentResultDto[];
}
