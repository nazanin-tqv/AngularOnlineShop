import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Admin, Customer, User } from './user/user.model';
import { catchError, map, throwError } from 'rxjs';
import { Product } from './product/product.model';
import { error } from 'console';
import { pid } from 'process';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private admins = signal<Admin[]>([]);
  private customers = signal<Customer[]>([]);
  private products = signal<Product[]>([]);
  private chosenCustomer = signal<Customer | null>(null);
  private chosenAdmin = signal<Admin | null>(null);
  private chosenProduct = signal<Product | null>(null);
  private isFetching = signal<boolean>(false); //TODO for loading
  error = signal<string>('');

  private httpClient = inject(HttpClient);
  constructor(private firestoreService: FirestoreService) {}
  // getters
  get getAdmins() {
    return this.admins();
  }
  get getCustomers() {
    return this.customers();
  }
  get getProducts() {
    return this.products();
  }
  get getChosenAdmin() {
    return this.chosenAdmin();
  }
  get getChosenCustomer() {
    return this.chosenCustomer();
  }
  get getChosenProduct() {
    return this.chosenProduct();
  }
  // fetch specific by id
  FetchCustomerById(id: string) {
    this.isFetching.set(true);
    return this.firestoreService
      .getCustomerById(id)
      .pipe(
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while fetching customer with id ${id}`
              )
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.chosenCustomer.set(response.documents);
          console.log('Customer:', this.chosenCustomer());
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
  }
  // fetch all customers
  fetchCustomerList() {
    this.isFetching.set(true);
    return this.firestoreService
      .getCustomers()
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error('Something went wrong while fetching customers')
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.customers.set(response.documents);
          console.log('Products:', this.customers());
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
  }

  FetchAdminById(id: string) {
    this.isFetching.set(true);
    return this.firestoreService
      .getAdminById(id)
      .pipe(
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while fetching admin with id ${id}`
              )
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.chosenCustomer.set(response.documents);
          console.log('Admin:', this.chosenAdmin());
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
  }

  fetchAdminList() {
    this.isFetching.set(true);

    return this.firestoreService
      .getAdmins()
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error('Something went wrong while fetching admins')
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.admins.set(response.documents);
          console.log('Admins:', this.admins());
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
  }
  FetchProductById(id: string) {
    return this.firestoreService
      .getCustomerById(id)
      .pipe(
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while fetching customer with id ${id}`
              )
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.chosenProduct.set(response.documents);
          console.log('Product:', this.chosenProduct());
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
  }
  FetchProductImage(id: string) {
    return this.firestoreService
      .getProductImage(id)
      .pipe(
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while fetching product image with id ${id}`
              )
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.chosenProduct.set(response.documents);
          console.log('Product:', this.chosenProduct());
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
  }
  fetchProductList() {
    this.isFetching.set(true);
    return this.firestoreService
      .getProducts()
      .pipe(
        catchError((error) =>
          throwError(
            () => new Error('Something went wrong while fetching products')
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.products.set(response.documents);
          console.log('Products:', this.products);
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
  }
  addCustomerHTTP(customer: Customer) {
    const prev = this.customers();
    return this.firestoreService
      .addCustomer(customer)
      .pipe(
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while adding customer ${customer.name['fname']} ${customer.name['lname']}`
              )
          )
        )
      )
      .subscribe((response) => {
        console.log('Customer added:', response);
        if (!prev.some((u) => u.id === customer.id)) {
          this.customers.update((prev) => [...prev, customer]);
        }
      });
  }
  addProductHTTP(product: Product) {
    const prevProducts = this.products();

    return this.firestoreService
      .addProduct(product)
      .pipe(
        map((resData) => resData.users),
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while adding product ${product.name}`
              )
          )
        )
      )
      .subscribe((response) => {
        console.log('Product added:', response);
        // const documentPath = response.name;
        // const documentId = documentPath.split('/').pop(); // Get the auto-generated ID (last part)
        // console.log('Document created with ID:', documentId);
        //product.id = documentId;
        if (!prevProducts.some((p) => p.id === product.id)) {
          this.products.update((prevProducts) => [...prevProducts, product]);
        }
      });
  }
  deleteProduct(pId: string) {
    const prevProducts = this.products();
    return this.firestoreService
      .deleteProduct(pId)
      .pipe(
        map((resData) => resData.users),
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while deleting product with id ${pId}`
              )
          )
        )
      )
      .subscribe((response) => {
        console.log('Product deleted:', response);
        if (prevProducts.some((p) => p.id === pId)) {
          this.products.set(prevProducts.filter((pr) => pr.id !== pId));
        }
      });
  }
  editProductHTML(pId: string, updatedProduct: Product) {
    const prevProducts = this.products();

    return this.firestoreService
      .updateProduct(pId, updatedProduct)
      .pipe(
        map((resData) => resData.users),
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while editing product ${updatedProduct.name}`
              )
          )
        )
      )
      .subscribe((response) => {
        console.log('Product updated:', response);
        if (prevProducts.some((p) => p.id === pId)) {
          this.products.set(prevProducts.filter((pr) => pr.id !== pId));
          this.products.update((prev) => [...prev, updatedProduct]);
        }
      });
  }
}
