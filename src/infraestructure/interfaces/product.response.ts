export interface TesloProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: TesloUser;
}

export enum Gender {
  Kid = 'kid',
  Men = 'men',
  Women = 'women',
}

export interface TesloUser {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}
