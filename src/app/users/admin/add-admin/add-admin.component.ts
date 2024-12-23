import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Admin } from '../../../user/user.model';
import { UsersService } from '../../../user/users.service';
import { DataService } from '../../../data.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
  imports: [ReactiveFormsModule, ButtonModule, NgIf],
  standalone: true,
})
export class AddAdminComponent implements OnInit {
  adminForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.adminForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.adminForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    const val = this.adminForm.value;
    const first = val.firstName;
    const last = val.lastName;
    const email = val.email;
    const password = val.password;
    // Stop if form is invalid
    if (this.adminForm.invalid) {
      return;
    }
    const newAdmin: Admin = {
      name: { fname: first as string, lname: last as string },
      email: email,
      password: password,
      godMode: true,
      id: this.userService.generateAdminId(email),
    };
    this.dataService.addAdminHTTP(newAdmin);

    // Handle successful form submission
    console.log('Admin Data:', this.adminForm.value);
    alert('Admin added successfully!');
  }

  onReset(): void {
    this.submitted = false;
    this.adminForm.reset();
  }
}
