import { IEntity } from './common';

export interface IDonation extends IEntity {
  name: string;
  description: string;
  image: string;
  categoryIds: number[];
  price: string;
}
