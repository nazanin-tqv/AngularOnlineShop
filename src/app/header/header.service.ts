import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private searchDone = signal<boolean>(false);
  private enteredSearchInput = signal<string>('');
  private foundProducts = signal<Product[]>([]);

  setFoundProducts(products: Product[]) {
    this.foundProducts.set(products);
  }
  get foundProductsGetter() {
    return this.foundProducts();
  }
  set setSearchDone(b: boolean) {
    this.searchDone.set(b);
  }

  get getSearchDone() {
    return this.searchDone();
  }
  set setEnteredSearchInput(v: string) {
    this.enteredSearchInput.set(v);
  }
  get getSearchInput() {
    return this.enteredSearchInput();
  }
}
