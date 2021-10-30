export enum CauseEnum {
  DONATION = 'donation',
  VOLUNTARY_WORK = 'voluntary_work',
}

export interface FeedbackImage {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CauseDto {
  id: number;
  title: string;
  description: string;
  type: CauseEnum;
  endAt: string;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
  feedbackImages?: Array<FeedbackImage>;
}

export interface AllCausesDto extends CauseDto {
  isFavorite?: boolean;
  organization: {
    name: string;
  };
}
