import { inject, Injectable, signal } from '@angular/core';
import { UsersService } from '../../user/users.service';
import { Admin, Customer, User } from '../../user/user.model';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataSerivce = inject(DataService);
  private userIsValid = signal<boolean>(false);
  private validUser?: User;
  constructor(private router: Router) {}
  authenticateUser(
    loginData: { email: string; password: string },
    users: User[]
  ) {
    const match = users?.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );
    if (typeof match == 'undefined') {
      this.userIsValid.set(false);
      return;
    } else {
      this.userIsValid.set(true);
      this.validUser = match;
      localStorage.setItem('loggedInUser', JSON.stringify(match)); // Store user info
      this.router.navigate(['/']);
    }
  }
  getLoggedInUser(): User | null {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getLoggedInUser();
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

  get userValid() {
    return this.userIsValid();
  }
  isCustomer(user: User): user is Customer {
    return (user as Customer).godMode === false;
  }

  isAdmin(user: User): user is Admin {
    return (user as Admin).godMode === true;
  }
}
