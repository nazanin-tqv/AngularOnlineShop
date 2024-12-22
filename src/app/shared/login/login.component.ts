import {
  Component,
  ElementRef,
  inject,
  input,
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
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StyleClass } from 'primeng/styleclass';
import { DataService } from '../../data.service';
import { AuthService } from './auth.service';
import { TypeTitlePipe } from './type-title.pipe';
import { Admin, Customer, User } from '../../user/user.model';
import { response } from 'express';
import { UsersService } from '../../user/users.service';

@Component({
  selector: 'shared-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    StyleClass,
    TypeTitlePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class SharedLoginComponent {
  private form = viewChild<ElementRef<HTMLFormElement>>('form');
  private authService = inject(AuthService);
  private dataService = inject(DataService);
  userType = input.required<'admin' | 'customer'>();
  loggedInUser: User | null = null;
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
      type: this.userType(),
    });
    
    this.authBoolean.set(this.authService.userValid);
    if (this.authBoolean()) {
      this.form()?.nativeElement.reset();
    }
  }
}
