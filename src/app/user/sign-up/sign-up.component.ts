import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.min(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.min(6)],
      }),
    }),
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.min(3)],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.min(3)],
    }),
    number: new FormControl('', {
      validators: [Validators.min(11), Validators.max(11)],
    }),
    address: new FormGroup({
      city: new FormControl('', { validators: [Validators.required] }),
      adr: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
    }),
  });
}
