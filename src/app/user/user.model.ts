import { Product } from '../product/product.model';

export interface User {
  id: string;
  name: { fname: string; lname: string };
  email: string;
  password: string;
}
export interface Customer extends User {
  address: string;
  number: string;
  postalCode: string;
  city: string;
  cart: Product[];
  balance: number;
  godMode: false;
}
export interface Admin extends User {
  godMode: true;
}
