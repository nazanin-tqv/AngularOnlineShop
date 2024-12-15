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
    'https://firestore.googleapis.com/v1/projects/onlineshop-6dac9/databases/(default)/documents';
  constructor(private http: HttpClient) {}

  // Method to get all documents from the collection
  getProducts(): Observable<any> {
    const url = `${this.firestoreBaseUrl}/products`;
    return this.http.get(url);
  }

  // Method to get all documents from the collection
  getCustomers(): Observable<any> {
    const url = `${this.firestoreBaseUrl}/customers`;
    return this.http.get(url);
  }
  getAdmins(): Observable<any> {
    const url = `${this.firestoreBaseUrl}/admins`;
    return this.http.get(url);
  }
  // get by id
  getProductById(documentId: string): Observable<any> {
    const url = `${this.firestoreBaseUrl}/products/${documentId}`;
    return this.http.get(url);
  }
  getCustomerById(documentId: string): Observable<any> {
    const url = `${this.firestoreBaseUrl}/customers/${documentId}`;
    return this.http.get(url);
  }
  getAdminById(documentId: string): Observable<any> {
    const url = `${this.firestoreBaseUrl}/admins/${documentId}`;
    return this.http.get(url);
  }

  // Method to add a new document to the collection
  addProduct(product: Product): Observable<any> {
    const url = `${this.firestoreBaseUrl}/products`;
    const body = {
      fields: {
        name: { stringValue: product.name },
        description: { stringValue: product.description },
        summary: { stringValue: product.summary },
        price: { doubleValue: product.price },
        image: { stringValue: product.image },
        brand: { stringValue: product.brand },
        categories: { arrayValue: product.categories },
      },
    };

    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  addCustomer(customer: Customer): Observable<any> {
    const url = `${this.firestoreBaseUrl}/customers`;
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

    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  addAdmin(admin: Admin): Observable<any> {
    const url = `${this.firestoreBaseUrl}/admins`;
    const body = {
      fields: {
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
    const url = `${this.firestoreBaseUrl}/products/${documentId}`;
    const body = {
      fields: {
        name: { stringValue: product.name },
        description: { stringValue: product.description },
        price: { doubleValue: product.price },
        image: { stringValue: product.image },
      },
    };

    return this.http.patch(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  updateCustomer(documentId: string, customer: Product): Observable<any> {
    const url = `${this.firestoreBaseUrl}/customers/${documentId}`;
    const body = {
      fields: {
        name: { stringValue: customer.name },
        description: { stringValue: customer.description },
        price: { doubleValue: customer.price },
        image: { stringValue: customer.image },
      },
    };

    return this.http.patch(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Method to delete a document from the collection
  deleteProduct(documentId: string): Observable<any> {
    const url = `${this.firestoreBaseUrl}/products/${documentId}`;
    return this.http.delete(url);
  }
}
