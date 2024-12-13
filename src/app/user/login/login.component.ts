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
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedLoginComponent } from "../../shared/login/login.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    RouterLink,
    RouterLinkActive,
    SharedLoginComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent { 

}
