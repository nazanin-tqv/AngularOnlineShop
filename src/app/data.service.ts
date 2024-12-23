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
  FetchCustomerObservableById(id: string) {
    this.isFetching.set(true);
    return this.firestoreService.getCustomerById(id).pipe(
      catchError((error) =>
        throwError(
          () =>
            new Error(
              `Something went wrong while fetching customer with id ${id}`
            )
        )
      ),
      map((response) => {
        console.log(response);
        return {
          id: response.name.split('/').pop(),
          name: {
            fname: response.fields.fname.stringValue,
            lname: response.fields.lname.stringValue,
          },
          email: response.fields.email.stringValue,
          password: response.fields.password.stringValue,
          address: response.fields.address.stringValue,
          city: response.fields.city.stringValue,
          balance: response.fields.balance.doubleValue,
          cart: [],
          postalCode: '',
          image: '',
          godMode: false,
          number: response.fields.number.stringValue,
        } as Customer;
      })
    );
  }
  FetchCustomerById(id: string) {
    this.FetchCustomerObservableById(id).subscribe({
      next: (response) => {
        this.chosenCustomer.set(response);
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
        console.log('Customers:', this.customers());
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
              cart: [],
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
    this.FetchAdminObservableById(id).subscribe({
      next: (response) => {
        this.chosenAdmin.set(response);
        console.log('Admin:', this.chosenAdmin());
      },
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });
  }
  FetchAdminObservableById(id: string) {
    this.isFetching.set(true);
    return this.firestoreService.getAdminById(id).pipe(
      catchError((error) =>
        throwError(
          () =>
            new Error(`Something went wrong while fetching admin with id ${id}`)
        )
      ),
      map((response) => {
        return {
          id: response['name'].split('/').pop(),
          name: {
            fname: response['fields'].fname.stringValue,
            lname: response['fields'].lname.stringValue,
          },
          email: response['fields'].email.stringValue,
          password: response['fields'].password.stringValue,
        } as Admin;
      })
    );
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
  fetchLogInObservable() {
    this.isFetching.set(true);
    return this.firestoreService.getLoggedIn().pipe(
      catchError((error) =>
        throwError(
          () => new Error('Something went wrong while fetching admins')
        )
      ),
      map((response) => {
        return {
          email: response['fields'].email.stringValue,
          password: response['fields'].password.stringValue,
          type: response['fields'].type.stringValue,
        };
      })
    );
  }
  FetchProductById(id: string) {
    this.fetchProductObservableById(id).subscribe({
      next: (response) => {
        this.chosenProduct.set(response);
        console.log('Product:', this.chosenProduct());
      },
      error: (error: Error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false),
    });
  }
  fetchProductObservableById(id: string) {
    return this.firestoreService.getProductById(id).pipe(
      catchError((error) =>
        throwError(
          () =>
            new Error(
              `Something went wrong while fetching customer with id ${id}`
            )
        )
      ),
      map((response) => {
        console.log(response);
        return {
          id: response['name'].split('/').pop(),
          name: response['fields'].name.stringValue,
          summary: response['fields'].summary.stringValue,
          description: response['fields'].description.stringValue,
          price: response['fields'].price.doubleValue,
          brand: response['fields'].brand.stringValue,
          image: response['fields'].Image?.stringValue ?? '',
          // Fixing categories mapping
          categories: Array.from(
            response['fields'].categories.arrayValue
              .values as unknown as Array<{
              stringValue: string;
            }>
          ).map(
            (l) => ({ label: l.stringValue, value: l.stringValue } as Category) // Add fallback
          ),
          quantity: response['fields'].quantity.doubleValue,
        } as Product;
      })
    );
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
              Image: { stringValue: string };
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
              image: doc['fields'].Image?.stringValue ?? '',
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
            } as Product;
          }
        )
      )
    );
  }
  addLoggedInHTTP(login: {
    email: string;
    password: string;
    type: 'admin' | 'customer';
  }) {
    const prev = this.customers();
    return this.firestoreService
      .addLoggedInUser(login)
      .pipe(
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while adding login ${login.email}`
              )
          )
        )
      )
      .subscribe((response) => {
        console.log(response);
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
  addAdminHTTP(admin: Admin) {
    const prev = this.admins();
    return this.firestoreService
      .addAdmin(admin)
      .pipe(
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while adding admin ${admin.name['fname']} ${admin.name['lname']}`
              )
          )
        )
      )
      .subscribe((response) => {
        console.log('Admin added:', response);
        if (!prev.some((u) => u.id === admin.id)) {
          this.admins.update((prev) => [...prev, admin]);
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
    console.log(`delete id: ${pId}`);
    const prevProducts = this.products();
    return this.firestoreService
      .deleteProduct(pId)
      .pipe(
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
  deleteAdmin(id: string) {
    console.log(`delete id: ${id}`);
    const prevAdmins = this.admins();
    return this.firestoreService
      .deleteAdmin(id)
      .pipe(
        catchError((error) =>
          throwError(
            () =>
              new Error(
                `Something went wrong while deleting admin with id ${id}`
              )
          )
        )
      )
      .subscribe((response) => {
        console.log('Admin deleted:', response);
        if (prevAdmins.some((p) => p.id === id)) {
          this.admins.set(prevAdmins.filter((pr) => pr.id !== id));
        }
      });
  }
  logOut() {
    return this.firestoreService
      .deleteLogIn()
      .pipe(
        map((resData) => resData.users),
        catchError((error) =>
          throwError(() => new Error(`Something went wrong while logging out`))
        )
      )
      .subscribe((response) => {
        console.log(response);
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
    return this.firestoreService.uploadFile(event, pId);
  }
}
