import { CreateCauseDto } from './create-cause-dto';

export interface UpdateCauseDto extends CreateCauseDto {
  id: number;
}
