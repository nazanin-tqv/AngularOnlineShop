import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgIf } from '@angular/common';
import { AuthService } from './auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StyleClass } from 'primeng/styleclass';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    CardModule,
    ButtonModule,
    InputTextModule,
    RouterLink,
    RouterLinkActive,
    StyleClass,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild<ElementRef<HTMLFormElement>>('form');
  private authService = inject(AuthService);
  authBoolean = signal<boolean>(true);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });
  onLogin() {
    const enteredEmail = this.loginForm.value.email as string;
    const enteredPassword = this.loginForm.value.password as string;
    console.log(`Email: ${enteredEmail} password: ${enteredPassword}`);
    this.authService.authenticateUser({
      email: enteredEmail,
      password: enteredPassword,
    });
    this.authBoolean.set(this.authService.userValid);
    if (this.authBoolean()) {
      this.form()?.nativeElement.reset();
    }
  }
}
