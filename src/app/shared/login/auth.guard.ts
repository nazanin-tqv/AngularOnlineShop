import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInAdmin()) {
      return true;
    } else {
      if (this.authService.loggedinUser?.type === 'admin') {
        this.router.navigate(['/admin']);
      }
      return false;
    }
  }
}
