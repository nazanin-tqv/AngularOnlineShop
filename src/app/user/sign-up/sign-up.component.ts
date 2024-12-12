import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    FieldsetModule,
  ],
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
    firstname: new FormControl('', {
      validators: [Validators.required, Validators.min(3)],
    }),
    lastname: new FormControl('', {
      validators: [Validators.required, Validators.min(3)],
    }),

    address: new FormGroup({
      city: new FormControl('', { validators: [Validators.required] }),
      street: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', {
        validators: [Validators.min(11), Validators.max(11)],
      }),
    }),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  onSignup() {}
  onReset() {}
}
