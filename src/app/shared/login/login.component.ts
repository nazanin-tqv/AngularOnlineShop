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
import { User } from '../../user/user.model';

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
    RouterLink,
    RouterLinkActive,
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

    if (this.userType() === 'admin') {
      this.authService.authenticateUser(
        {
          email: enteredEmail,
          password: enteredPassword,
        },
        this.dataService.getAdmins
      );
      console.log('Authenticated as admin');
    } else {
      this.authService.authenticateUser(
        {
          email: enteredEmail,
          password: enteredPassword,
        },
        this.dataService.getCustomers
      );
      console.log('Authenticated as customer');
    }
    const log = this.authService.getLoggedInUser();
    if (log) {
      this.loggedInUser = log;
    }

    this.authBoolean.set(this.authService.userValid);
    if (this.authBoolean()) {
      this.form()?.nativeElement.reset();
    }
  }
}