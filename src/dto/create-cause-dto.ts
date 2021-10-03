export interface CreateCauseDto {
  title: string;
  description: string;
  endAt: string;
  type: 'donation' | 'voluntary_work';
}
