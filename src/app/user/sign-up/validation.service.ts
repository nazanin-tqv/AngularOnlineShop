import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  equalPasswords(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password === confirmPassword) {
      return null;
    }
    return { passwordsNotEqual: true };
  }
  emailUsedBefore() {
    //TODO implement using http call
  }
}
