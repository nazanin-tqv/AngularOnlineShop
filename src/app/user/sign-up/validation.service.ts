import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DataService } from '../../data.service';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private dataService: DataService) {}
  equalPasswords(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password === confirmPassword) {
      return null;
    }
    return { passwordsNotEqual: true };
  }
  emailUsedBefore(control: AbstractControl) {
    const enteredEmail = control.value;
    var users: User[] = [];
    if (!(typeof this.dataService.getCustomers === 'undefined')) {
      users = this.dataService.getCustomers;
    }

    if (!users?.some((u) => u.email === enteredEmail)) return null;

    return { emailUsedBefore: true };
  }
}
