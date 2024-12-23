import { inject, Injectable, signal } from '@angular/core';
import { Product } from './product.model';
import { HeaderService } from '../header/header.service';
import { DataService } from '../data.service';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private dataService = inject(DataService);
  private products = this.dataService.getProducts;
  private onDisplayProducts?: Product[];
  private foundNothing = signal<boolean>(false);
  private selectedTableProduct = signal<Product | null>(null);
  private headerService = inject(HeaderService);
  get selectedProduct() {
    return this.selectedTableProduct();
  }

  setSelectedProduct(v: Product) {
    this.selectedTableProduct.set(v);
  }

  get getProducts() {
    return this.products;
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
          product.categories.some((c) => c.label === searchInput)
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
  generateProductId(name: string, brand: string): string {
    // Concatenate name and brand with a separator to avoid ambiguity
    const input = `${name.trim().toLowerCase()}-${brand.trim().toLowerCase()}`;

    // Generate a SHA-256 hash of the input
    const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);

    // Optionally, shorten the hash for readability (e.g., first 12 characters)
    const shortHash = hash.substring(0, 12).toUpperCase();

    return `PROD-${shortHash}`;
  }
}
