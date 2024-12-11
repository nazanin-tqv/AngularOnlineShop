import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { WebsiteComponent } from './website/website.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: WebsiteComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
];
