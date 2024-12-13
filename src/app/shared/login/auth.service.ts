import { inject, Injectable, signal } from '@angular/core';
import { UsersService } from '../../user/users.service';
import { User } from '../../user/user.model';
import { DataService } from '../../data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataSerivce = inject(DataService);
  private userIsValid = signal<boolean>(false);
  private validUser?: User;
  authenticateUser(
    loginData: { email: string; password: string },
    users: User[]
  ) {
    const match = users?.filter(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );
    if (typeof match == 'undefined' || match.length === 0) {
      this.userIsValid.set(false);
      return;
    } else {
      this.userIsValid.set(true);
      this.validUser = match[0];
    }
  }
  get getValidUser() {
    return this.validUser;
  }
  get userValid() {
    return this.userIsValid();
  }
}
