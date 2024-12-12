import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Admin, Customer, User } from './user/user.model';
import { catchError, map, throwError } from 'rxjs';
import { Product } from './product/product.model';
import { error } from 'console';
import { pid } from 'process';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private admins = signal<Admin[]>([]);
  private customers = signal<Customer[]>([]);
  private products = signal<Product[]>([]);
  private isFetching = signal<boolean>(false); //TODO for loading
  error = signal<string>('');
  private url =
    'https://firestore.googleapis.com/v1/projects/onlineshop-6dac9/databases/(default)/documents';
  private httpClient = inject(HttpClient);
  get getAdmins() {
    return this.admins();
  }
  get getCustomers() {
    return this.customers();
  }
  get getProducts() {
    return this.products();
  }
  fetchCustomerList() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{ users: Customer[] }>(`${this.url}users/customer`)
      .pipe(
        map((resData) => resData.users),
        catchError((error) =>
          throwError(
            () => new Error('Something went wrong while fetching customers')
          )
        )
      )
      .subscribe({
        next: (customers) => {
          this.customers.set(customers);
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
    return subscription;
  }
  fetchAdminList() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{ users: Admin[] }>(`${this.url}users/admin`)
      .pipe(
        map((resData) => resData.users),
        catchError((error) =>
          throwError(
            () => new Error('Something went wrong while fetching admins')
          )
        )
      )
      .subscribe({
        next: (admins) => {
          this.admins.set(admins);
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
    return subscription;
  }
  fetchProductList() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{ products: Product[] }>(`${this.url}products`)
      .pipe(
        map((resData) => resData.products),
        catchError((error) =>
          throwError(
            () => new Error('Something went wrong while fetching products')
          )
        )
      )
      .subscribe({
        next: (products) => {
          this.products.set(products);
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
    return subscription;
  }
  addCustomerHTTP(customer: Customer) {
    const prev = this.customers();
    if (!prev.some((u) => u.id === customer.id)) {
      this.customers.update((prev) => [...prev, customer]);
    }
    const subscription = this.httpClient
      .put(`${this.url}users/customers`, customer)
      .pipe(
        catchError((error) =>
          throwError(() => new Error('Something went wrong while posting user'))
        )
      )
      .subscribe({
        next: (resData) => console.log(resData),
        error: (error: Error) => this.error.set(error.message),
      });
    return subscription;
  }
  addProductHTTP(product: Product) {
    const prevProducts = this.products();
    if (!prevProducts.some((p) => p.id === product.id)) {
      this.products.update((prevProducts) => [...prevProducts, product]);
    }
    const subscription = this.httpClient
      .put(`${this.url}/products`, product)
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error('Something went wrong while posting product')
          )
        )
      )
      .subscribe({
        next: (resData) => console.log(resData),
        error: (error: Error) => this.error.set(error.message),
      });
    return subscription;
  }
  deleteProduct(pId: string) {
    const prevProducts = this.products();
    if (prevProducts.some((p) => p.id === pId)) {
      this.products.set(prevProducts.filter((pr) => pr.id !== pId));
    }
    return this.httpClient
      .delete(`${this.url}/products/${pId}`)
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error('Something went wrong while deleting product')
          )
        )
      )
      .subscribe({
        error: (error: Error) => this.error.set(error.message),
      });
  }
  editProductHTML(pId: string, edited: Product) {
    const prevProducts = this.products();
    if (prevProducts.some((p) => p.id === pId)) {
      this.products.set(prevProducts.filter((pr) => pr.id !== pId));
      this.products.update((prev) => [...prev, edited]);
    }
    return this.httpClient
      .put(`${this.url}/products/${pId}`, edited)
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error('Something went wrong while editting product')
          )
        )
      )
      .subscribe({
        error: (error: Error) => this.error.set(error.message),
      });
  }
}
