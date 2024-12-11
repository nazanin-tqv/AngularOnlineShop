import { Product } from '../product/product.model';

export interface User {
  id: string;
  name: { fname: string; lname: string };
  address: string;
  number: string;
  postalCode: string;
  city: string;
  cart: Product[];
}
