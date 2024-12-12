import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Admin } from './user/user.model';
import { Product } from './product/product.model';

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getAdmins(): Observable<Admin[]> {
    const usersCollection = collection(this.firestore, 'users/admin');
    return collectionData(usersCollection, { idField: 'id' }) as Observable<
      Admin[]
    >;
  }

  addAdmin(user: Admin): Promise<void> {
    const usersCollection = collection(this.firestore, 'users/admin');
    return addDoc(usersCollection, user).then(() => {});
  }
  getProducts(): Observable<Product[]> {
    const usersCollection = collection(this.firestore, 'products');
    return collectionData(usersCollection, { idField: 'id' }) as Observable<
      Product[]
    >;
  }

  addProduct(product: Product): Promise<void> {
    const usersCollection = collection(this.firestore, 'products');
    return addDoc(usersCollection, product).then(() => {});
  }
}
