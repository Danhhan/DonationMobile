export interface ICategory {
  categoryId: number;
  name: string;
}

export interface IDonation {
  name: string;
  description: string;
  image: string;
  donationItemId: number;
  categoryIds: number[];
  price: string;
}
