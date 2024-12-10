export interface Product {
  name: string;
  img_src: string;
  summary: string;
  brand: 'Samsung' | 'Apple' | 'Sony' | 'Pixel' | 'LG';
  description: string;
  categories: string[];
}
