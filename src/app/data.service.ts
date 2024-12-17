import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnChanges, OnInit, signal } from '@angular/core';
import { Admin, Customer, User } from './user/user.model';
import { catchError, map, throwError } from 'rxjs';
import { Category, categoryList, Product } from './product/product.model';
import { error } from 'console';
import { pid } from 'process';
import { FirestoreService } from './firestore.service';
import { DocumentData } from 'firebase/firestore';
import { FileUploadEvent, FileUploadHandlerEvent } from 'primeng/fileupload';

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
  private productCount = signal<number>(0);
  private customerCount = signal<number>(0);
  private adminCount = signal<number>(0);

  error = signal<string>('');

  constructor(private firestoreService: FirestoreService) {}

  // getters
  get getAdmins() {
    return this.admins();
  }
  get getProductCount() {
    return this.productCount();
  }
  get getCustomerCount() {
    return this.customerCount();
  }
  get getAdminCount() {
    return this.adminCount();
  }
  setAdmins(admins: Admin[]) {
    this.admins.set(admins);
  }
  get getCustomers() {
    return this.customers();
  }
  setCustomers(customers: Customer[]) {
    this.customers.set(customers);
  }
  get getProducts() {
    return this.products();
  }
  setProducts(products: Product[]) {
    this.products.set(products);
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
        ),
        map((response) =>
          response.documents.map(
            (doc: {
              name: string;
              fields: {
                fname: { stringValue: string };
                lname: { stringValue: string };
                email: { stringValue: string };
                password: { stringValue: string };
                address: { stringValue: string };
                city: { stringValue: string };
                balance: { doubleValue: number };
                cart: { arrayValue: string[] };
                number: { stringValue: string };
              };
            }) => {
              return {
                id: doc['name'].split('/').pop(),
                name: {
                  fname: doc['fields'].fname.stringValue,
                  lname: doc['fields'].lname.stringValue,
                },
                email: doc['fields'].email.stringValue,
                password: doc['fields'].password.stringValue,
                address: doc['fields'].address.stringValue,
                city: doc['fields'].city.stringValue,
                balance: doc['fields'].balance.doubleValue,
                cart: doc['fields'].cart.arrayValue.map((pId) =>
                  this.products().find((p) => p.id === pId)
                ),
                postalCode: '',
                godMode: false,
                number: doc['fields'].number.stringValue,
              } as Customer;
            }
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
    this.fetchCustomerListObservable().subscribe({
      next: (response) => {
        this.customers.set(response);
        console.log('Products:', this.customers());
      },
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });
  }
  fetchCustomerListObservable() {
    this.isFetching.set(true);
    return this.firestoreService.getCustomers().pipe(
      catchError((error) =>
        throwError(
          () => new Error('Something went wrong while fetching customers')
        )
      ),
      map((response) =>
        response.documents.map(
          (doc: {
            name: string;
            fields: {
              fname: { stringValue: string };
              lname: { stringValue: string };
              email: { stringValue: string };
              password: { stringValue: string };
              address: { stringValue: string };
              city: { stringValue: string };
              balance: { doubleValue: number };
              cart: { arrayValue: string[] };
              number: { stringValue: string };
            };
          }) => {
            return {
              id: doc['name'].split('/').pop(),
              name: {
                fname: doc['fields'].fname.stringValue,
                lname: doc['fields'].lname.stringValue,
              },
              email: doc['fields'].email.stringValue,
              password: doc['fields'].password.stringValue,
              address: doc['fields'].address.stringValue,
              city: doc['fields'].city.stringValue,
              balance: doc['fields'].balance.doubleValue,
              cart: doc['fields'].cart.arrayValue.map((pId) =>
                this.products().find((p) => p.id === pId)
              ),
              postalCode: '',
              godMode: false,
              number: doc['fields'].number.stringValue,
            } as Customer;
          }
        )
      )
    );
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
        ),
        map((response) =>
          response.documents.map(
            (doc: {
              name: string;
              fields: {
                fname: { stringValue: string };
                lname: { stringValue: string };
                email: { stringValue: string };
                password: { stringValue: string };
              };
            }) => {
              return {
                id: doc['name'].split('/').pop(),
                name: {
                  fname: doc['fields'].fname.stringValue,
                  lname: doc['fields'].lname.stringValue,
                },
                email: doc['fields'].email.stringValue,
                password: doc['fields'].password.stringValue,
              } as Admin;
            }
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.chosenCustomer.set(response);
          console.log('Admin:', this.chosenAdmin());
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
  }

  fetchAdminList() {
    this.fetchAdminListObservable().subscribe({
      next: (response) => {
        this.admins.set(response);
        console.log('Admins:', this.admins());
      },
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });
  }
  fetchAdminListObservable() {
    this.isFetching.set(true);
    return this.firestoreService.getAdmins().pipe(
      catchError((error) =>
        throwError(
          () => new Error('Something went wrong while fetching admins')
        )
      ),
      map((response) =>
        response.documents.map(
          (doc: {
            name: string;
            fields: {
              fname: { stringValue: string };
              lname: { stringValue: string };
              email: { stringValue: string };
              password: { stringValue: string };
            };
          }) => {
            return {
              id: doc['name'].split('/').pop(),
              name: {
                fname: doc['fields'].fname.stringValue,
                lname: doc['fields'].lname.stringValue,
              },
              email: doc['fields'].email.stringValue,
              password: doc['fields'].password.stringValue,
            } as Admin;
          }
        )
      )
    );
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
        ),
        map((response) =>
          response.documents.map(
            (doc: {
              name: string;
              fields: {
                name: { stringValue: string };
                summary: { stringValue: string };
                description: { stringValue: string };
                brand: { stringValue: string };
                price: { doubleValue: number };
                categories: { arrayValue: { stringValue: string }[] };
                quantity: { doubleValue: number };
              };
            }) => {
              return {
                id: doc['name'].split('/').pop(),
                name: doc['fields'].name.stringValue,
                summary: doc['fields'].summary.stringValue,
                description: doc['fields'].description.stringValue,
                price: doc['fields'].price.doubleValue,
                brand: doc['fields'].brand.stringValue,
                image: `${this.firestoreService.getBaseUrl}assets/${doc['name']
                  .split('/')
                  .pop()}`,
                categories: Array.from(doc['fields'].categories.arrayValue).map(
                  (l) => categoryList.find((c) => c.label === l.stringValue)
                ),
                quantity: doc['fields'].quantity.doubleValue,
              } as Product;
            }
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
    this.fetchProductObservable().subscribe({
      next: (response) => {
        console.log(response.fields);
        this.products.set(response.fields);
        console.log('Products:', this.products);
      },
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });
  }
  fetchProductObservable() {
    this.isFetching.set(true);
    return this.firestoreService.getProducts().pipe(
      catchError((error) =>
        throwError(
          () => new Error('Something went wrong while fetching products')
        )
      ),
      map((response) =>
        response.documents.map(
          (doc: {
            name: string;
            fields: {
              name: { stringValue: string };
              summary: { stringValue: string };
              description: { stringValue: string };
              brand: { stringValue: string };
              price: { doubleValue: number };
              categories: { arrayValue: { stringValue: string }[] };
              quantity: { doubleValue: number };
            };
          }) => {
            return {
              id: doc['name'].split('/').pop(),
              name: doc['fields'].name.stringValue,
              summary: doc['fields'].summary.stringValue,
              description: doc['fields'].description.stringValue,
              price: doc['fields'].price.doubleValue,
              brand: doc['fields'].brand.stringValue,
              image: `${this.firestoreService.getBaseUrl}assets/${doc['name']
                .split('/')
                .pop()}`,
              // Fixing categories mapping
              categories: Array.from(
                doc['fields'].categories.arrayValue.values as unknown as Array<{
                  stringValue: string;
                }>
              ).map(
                (l) =>
                  ({ label: l.stringValue, value: l.stringValue } as Category) // Add fallback
              ),
              quantity: doc['fields'].quantity.doubleValue,
            } as unknown as Product;
          }
        )
      )
    );
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
  uploadProductImg(event: FileUploadHandlerEvent, pId: string) {
    this.firestoreService.uploadFile(event, pId).subscribe(
      (response) => {
        console.log('File uploaded successfully', response);
      },
      (error) => {
        console.error('Error uploading file', error);
      }
    );
  }
}
