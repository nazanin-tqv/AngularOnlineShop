import { inject, Injectable, signal } from '@angular/core';
import { Product } from './product.model';
import { HeaderService } from '../header/header.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products?: Product[];
  readonly productsReadonly = this.products;
  private onDisplayProducts?: Product[];
  private foundNothing = signal<boolean>(false);

  private headerService = inject(HeaderService);
  get getProducts() {
    return this.productsReadonly;
  }
  set setFoundNothing(b: boolean) {
    this.foundNothing.set(b);
  }
  get getFoundNothing() {
    return this.foundNothing();
  }
  searchedProducts() {
    const searchInput = this.headerService.getSearchInput;
    if (searchInput !== '') {
      return this.products?.filter(
        (product) =>
          product.name.includes(searchInput) ||
          product.brand.toString() === searchInput ||
          product.categories.includes(searchInput)
      );
    }
    return;
  }

  displayedProducts() {
    if (!this.headerService.getSearchDone) {
      this.onDisplayProducts = this.products;
    } else {
      const foundProducts = this.searchedProducts();
      if (foundProducts?.length === 0) {
        this.setFoundNothing = true;
      } else {
        this.onDisplayProducts = foundProducts as Product[];
      }
    }
    return this.onDisplayProducts;
  }
}
