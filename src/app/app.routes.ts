import { Routes } from '@angular/router';
import { WebsiteComponent } from './website/website.component';
import { AuthGuard } from './shared/login/auth.guard';

export const routes: Routes = [
  { path: '', component: WebsiteComponent },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin-panel/login/login.component').then(
        (mod) => mod.AdminLoginComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./user/login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./user/sign-up/sign-up.component').then(
        (mod) => mod.SignUpComponent
      ),
  },
  {
    path: 'search/:input',
    loadComponent: () =>
      import('./header/search-result/search-result.component').then(
        (mod) => mod.SearchResultComponent
      ),
  },
  {
    path: 'product-list',
    loadComponent: () =>
      import('./website/products/products.component').then(
        (mod) => mod.WebsiteProductsComponent
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./website/navbar/cat.routes').then((mod) => mod.catRoutes),
  },

  {
    path: 'product/:id/:name',
    loadComponent: () =>
      import('./website/product-detail/product-detail.component').then(
        (mod) => mod.WebsiteProductDetails
      ),
  },
  {
    path: 'admin-panel',
    loadComponent: () =>
      import('./admin-panel/admin-panel.component').then(
        (mod) => mod.AdminPanelComponent
      ),
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin-panel/admin.routes').then((mod) => mod.adminRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (mod) => mod.NotFoundComponent
      ),
  },
];
