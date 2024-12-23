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
import { ProductDisplayComponent } from './product/product-display/product-display.component';
import { AdminProductDetails } from './product/product-details/product-details.component';
import { ThumnailListComponent } from './website/thumnail-list/thumnail-list.component';
import { WebsiteProductDetails } from './website/product-detail/product-detail.component';
import { WebsiteProductsComponent } from './website/products/products.component';
import { AdminOutletComponent } from './users/admin/admin-outlet/admin-outlet.component';
import { NavFilterComponent } from './website/navbar/nav-filter/nav-filter.component';
import { NavOutletComponent } from './website/navbar/nav-outlet/nav-outlet.component';

export const routes: Routes = [
  { path: '', component: WebsiteComponent, canActivate: [AuthGuard] },

  {
    path: 'admin',
    component: AdminLoginComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'customers', component: WebsiteComponent },
  {
    path: 'product-list',
    component: WebsiteProductsComponent,
  },
  {
    path: 'categories',
    component: NavOutletComponent,
    children: [
      {
        path: 'digital',
        component: NavOutletComponent,
        children: [
          {
            path: 'mobile',
            component: NavFilterComponent,
          },
          {
            path: 'tablet',
            component: NavFilterComponent,
          },
          {
            path: 'laptop',
            component: NavFilterComponent,
          },
        ],
      },
      {
        path: 'clothing',
        component: NavOutletComponent,
        children: [
          { path: 'women', component: NavFilterComponent },
          { path: 'men', component: NavFilterComponent },
          { path: 'children', component: NavFilterComponent },
        ],
      },
      {
        path: 'culture',
        component: NavOutletComponent,
        children: [
          { path: 'books', component: NavFilterComponent },
          { path: 'note', component: NavFilterComponent },
        ],
      },
    ],
  },

  {
    path: 'product/:id/:name',
    component: WebsiteProductDetails,
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'products',
        component: ProductsListComponent,
        children: [
          {
            path: 'display-products',
            component: ProductDisplayComponent,
          },
          {
            path: 'display-products/:id/:name',
            component: AdminProductDetails,
          },
          { path: 'add-product', component: NewProductComponent },
          { path: 'remove-product', component: RemoveProductComponent },
          { path: 'edit-product/:id/:name', component: EditProductComponent },
        ],
      },
      {
        path: 'admins',
        component: AdminOutletComponent,
        children: [
          { path: 'display-admins', component: AdminListComponent },
          { path: 'add-admin', component: AddAdminComponent },
          { path: 'remove-admin/:id/:name', component: RemoveAdminComponent },
        ],
      },
      {
        path: 'customers',
        component: CustomerListComponent,
      },
    ],
  },
];
