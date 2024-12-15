import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product/product.model';
import { Admin, Customer } from './user/user.model';

// Define the Product interface (or other document type based on your Firestore structure)

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestoreBaseUrl =
    'https://firestore.googleapis.com/v1/projects/onlineshop-6dac9/databases/(default)/documents/';
  constructor(private http: HttpClient) {}

  // Method to get all documents from the collection
  getProducts(): Observable<any> {
    const url = `${this.firestoreBaseUrl}products`;
    return this.http.get(url);
  }

  // Method to get all documents from the collection
  getCustomers(): Observable<any> {
    const url = `${this.firestoreBaseUrl}customers/customer`;
    return this.http.get(url);
  }
  getAdmins(): Observable<any> {
    const url = `${this.firestoreBaseUrl}admins/admin`;
    return this.http.get(url);
  }
  // get by id
  getProductById(documentId: string): Observable<any> {
    const url = `${this.firestoreBaseUrl}products/product/${documentId}`;
    return this.http.get(url);
  }
  getCustomerById(documentId: string): Observable<any> {
    const url = `${this.firestoreBaseUrl}customers/customer/${documentId}`;
    return this.http.get(url);
  }
  getAdminById(documentId: string): Observable<any> {
    const url = `${this.firestoreBaseUrl}admins/admin/${documentId}`;
    return this.http.get(url);
  }
  getProductImage(documentId: string): Observable<any> {
    const url = `${this.firestoreBaseUrl}assets/asset/${documentId}`;
    return this.http.get(url);
  }

  // Method to add a new document to the collection
  addProduct(product: Product): Observable<any> {
    const url = `${this.firestoreBaseUrl}products/product/${product.id}`;
    const body = {
      fields: {
        name: { stringValue: product.name },
        description: { stringValue: product.description },
        summary: { stringValue: product.summary },
        price: { doubleValue: product.price },
        brand: { stringValue: product.brand },
        categories: {
          arrayValue: {
            values: product.categories.map((category) => ({
              stringValue: category.label,
            })),
          },
        },
      },
    };

    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  addCustomer(customer: Customer): Observable<any> {
    const url = `${this.firestoreBaseUrl}customers/customer`;
    const body = {
      fields: {
        id: { stringValue: customer.id },
        fname: { stringValue: customer.name['fname'] },
        lname: { stringValue: customer.name['lname'] },
        address: { stringValue: customer.address },
        email: { stringValue: customer.email },
        balance: { doubleValue: customer.balance },
        password: { stringValue: customer.password },
        cart: { arrayValue: customer.cart },
      },
    };

    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  addAdmin(admin: Admin): Observable<any> {
    const url = `${this.firestoreBaseUrl}admins/admin`;
    const body = {
      fields: {
        id: { stringValue: admin.id },
        fname: { stringValue: admin.name['fname'] },
        lname: { stringValue: admin.name['lname'] },
        email: { stringValue: admin.email },
        password: { stringValue: admin.password },
      },
    };

    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Method to update an existing document
  updateProduct(documentId: string, product: Product): Observable<any> {
    const url = `${this.firestoreBaseUrl}products/product/${documentId}`;
    const body = {
      fields: {
        name: { stringValue: product.name },
        description: { stringValue: product.description },
        summary: { stringValue: product.summary },
        price: { doubleValue: product.price },
        image: { stringValue: product.image },
        categories: {
          arrayValue: {
            values: product.categories.map((category) => ({
              stringValue: category.label,
            })),
          },
        },
      },
    };

    return this.http.patch(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  updateCustomer(documentId: string, customer: Customer): Observable<any> {
    const url = `${this.firestoreBaseUrl}customers/customer/${documentId}`;
    const body = {
      fields: {
        fname: { stringValue: customer.name['fname'] },
        lname: { stringValue: customer.name['lname'] },
        address: { stringValue: customer.address },
        email: { stringValue: customer.email },
        balance: { doubleValue: customer.balance },
        password: { stringValue: customer.password },
        cart: { arrayValue: customer.cart },
      },
    };

    return this.http.patch(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Method to delete a document from the collection
  deleteProduct(documentId: string): Observable<any> {
    const url = `${this.firestoreBaseUrl}products/product/${documentId}`;
    return this.http.delete(url);
  }
}
