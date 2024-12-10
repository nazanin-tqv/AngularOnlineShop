import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { WebsiteComponent } from './website/website.component';

export const routes: Routes = [
  { path: '', component: WebsiteComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
  },
];
