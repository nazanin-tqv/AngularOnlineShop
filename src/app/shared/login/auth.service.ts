import { inject, Injectable, OnInit, signal } from '@angular/core';
import { UsersService } from '../../user/users.service';
import { Admin, Customer, User } from '../../user/user.model';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
  get loggedinUser() {
    return this.loggedInUser;
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
            this.loggedInUser = loginData;
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
            this.loggedInUser = loginData;
            this.router.navigate(['admin-panel']);
          }
        },
      });
    } else {
      console.log('Login not successful');
      this.userIsValid.set(false);
    }
  }
  isLoggedInAdmin() {
    var logb: boolean = false;

    var log: {
      email: string;
      password: string;
      type: 'admin' | 'customer';
    };
    this.dataSerivce.fetchLogInObservable().subscribe({
      next: (response) => {
        log = response;
        if (log && log?.type === 'admin') {
          logb = true;
        }
      },
    });
    return logb;
  }
  isLoggedInCustomer() {
    var logb: boolean = false;
    var log: {
      email: string;
      password: string;
      type: 'admin' | 'customer';
    };
    this.dataSerivce.fetchLogInObservable().subscribe({
      next: (response) => {
        log = response;
        if (log && log?.type === 'customer') {
          logb = true;
        }
      },
    });
    return logb;
  }
  get userValid() {
    return this.userIsValid();
  }
}
