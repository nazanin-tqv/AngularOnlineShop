import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users?: User[];
  get getUsers() {
    return this.users;
  }
}
