import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { WebsiteComponent } from './website/website.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AdminLoginComponent } from './admin-panel/login/login.component';
import { AuthGuard } from './shared/login/auth.guard';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { NewProductComponent } from './product/new-product/new-product.component';
import { RemoveProductComponent } from './product/remove-product/remove-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { AdminListComponent } from './users/admin/admin-list/admin-list.component';
import { AddAdminComponent } from './users/admin/add-admin/add-admin.component';
import { RemoveAdminComponent } from './users/admin/remove-admin/remove-admin.component';
import { CustomerListComponent } from './users/customer/customer-list/customer-list.component';

export const routes: Routes = [
  { path: '', component: WebsiteComponent, canActivate: [AuthGuard] },

  {
    path: 'admin',
    component: AdminLoginComponent,
    children: [
      {
        path: 'panel',
        component: AdminPanelComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'customers', component: WebsiteComponent },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'products',
        component: ProductsListComponent,
        children: [
          { path: 'add-product', component: NewProductComponent },
          { path: 'remove-product', component: RemoveProductComponent },
          { path: 'edit-product', component: EditProductComponent },
        ],
      },
      {
        path: 'admins',
        component: AdminListComponent,
        children: [
          { path: 'add-admin', component: AddAdminComponent },
          { path: 'remove-admin', component: RemoveAdminComponent },
        ],
      },
      {
        path: 'customers',
        component: CustomerListComponent,
      },
    ],
  },
];
