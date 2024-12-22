import { inject, Injectable, OnInit, signal } from '@angular/core';
import { UsersService } from '../../user/users.service';
import { Admin, Customer, User } from '../../user/user.model';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private dataSerivce = inject(DataService);
  private userIsValid = signal<boolean>(false);
  private userService = inject(UsersService);

  private validUser?: User;
  private loggedInUser?: {
    email: string;
    password: string;
    type: 'admin' | 'customer';
  };
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.dataSerivce.fetchLogInObservable().subscribe({
      next: (response) => {
        console.log('Login response:', response);
        this.loggedInUser = response;
      },
    });
  }
  authenticateUser(loginData: {
    email: string;
    password: string;
    type: 'admin' | 'customer';
  }) {
    if (loginData.type === 'customer') {
      var customer: Customer;
      const id = this.userService.generateCustomerId(loginData.email);
      this.dataSerivce.FetchCustomerObservableById(id).subscribe({
        next: (response) => {
          customer = response;
          if (
            customer.email === loginData.email &&
            customer.password === loginData.password
          ) {
            this.dataSerivce.addLoggedInHTTP(loginData);
            console.log('authentication successful');
            this.router.navigate(['/']);
            this.userIsValid.set(true);
          }
        },
      });
    } else if (loginData.type === 'admin') {
      var admin: Admin;
      const id = this.userService.generateAdminId(loginData.email);
      this.dataSerivce.FetchAdminObservableById(id).subscribe({
        next: (response) => {
          admin = response;
          if (
            admin.email === loginData.email &&
            admin.password === loginData.password
          ) {
            this.dataSerivce.addLoggedInHTTP(loginData);
            console.log('authentication successful');
            this.userIsValid.set(true);
            this.router.navigate(['admin-panel']);
          }
        },
      });
    } else {
      console.log('Login not successful');
      this.userIsValid.set(false);
    }
  }
  isLoggedIn() {
    return this.userIsValid();
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
