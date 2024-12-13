import { Component, inject } from '@angular/core';
import { SharedLoginComponent } from '../../shared/login/login.component';
import { AuthService } from '../../shared/login/auth.service';
import { Admin } from '../../user/user.model';

@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [SharedLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class AdminLoginComponent {
  private authService = inject(AuthService);
  validUser?: Admin;
  onAdminLogin() {
    if (this.authService.userValid) {
      this.validUser = this.authService.getValidUser as Admin;
    } else return;
  }
}
