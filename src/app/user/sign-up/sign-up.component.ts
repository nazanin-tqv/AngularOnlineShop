import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
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
import { ValidationService } from './validation.service';
import { UsersService } from '../users.service';
import { Product } from '../../product/product.model';
import { DataService } from '../../data.service';
import { Customer, User } from '../user.model';
import { Subscription } from 'rxjs';
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
export class SignUpComponent implements OnInit {
  private form = viewChild<ElementRef<HTMLFormElement>>('form');
  private validationService = inject(ValidationService);
  private userService = inject(UsersService);
  private dataService = inject(DataService);
  private subscription?: Subscription;
  private destroyRef = inject(ElementRef);
  ngOnInit(): void {}
  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.min(6),
          // this.validationService.emailUsedBefore,
        ],
      }),
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.min(6),
          this.validationService.equalPasswords,
        ],
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

  onSignup() {
    const formValue = this.signupForm.value;
    const enteredName = {
      fname: formValue.firstname,
      lname: formValue.lastname,
    };
    const enteredEmail = formValue.email;
    const enteredPassword = formValue.passwords?.password;
    const addressValues = formValue.address;
    const enteredStreet = addressValues?.street;
    const enteredNumber = addressValues?.number;
    const enteredPostalCode = addressValues?.postalCode;
    const enteredCity = addressValues?.city;
    const id = this.userService.generateCustomerId(enteredEmail ?? 'invalid');
    const cart: Product[] = [];
    const newCustomer = {
      id: id,
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      address: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
      number: enteredNumber,
      cart: cart,
      balance: 1000000,
    } as Customer;
    console.log(newCustomer);
    this.subscription = this.dataService.addCustomerHTTP(newCustomer);
    //this.destroyRef.nativeElement.OnDestroy(this.subscription.unsubscribe());
    this.form()?.nativeElement.reset();
  }
  onReset() {
    this.form()?.nativeElement.reset();
  }
}
