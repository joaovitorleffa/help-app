enum CauseEnum {
  DONATION = 'donation',
  VOLUNTARY_WORK = 'voluntary_work',
}

export interface CauseDto {
  id: number;
  title: string;
  description: string;
  type: CauseEnum;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}
