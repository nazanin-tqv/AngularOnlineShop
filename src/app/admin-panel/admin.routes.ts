import { Routes } from "@angular/router";
import { AdminOutletComponent } from "../users/admin/admin-outlet/admin-outlet.component";
import { AdminListComponent } from "../users/admin/admin-list/admin-list.component";
import { AddAdminComponent } from "../users/admin/add-admin/add-admin.component";
import { RemoveAdminComponent } from "../users/admin/remove-admin/remove-admin.component";
import { EditProductComponent } from "../product/edit-product/edit-product.component";
import { NewProductComponent } from "../product/new-product/new-product.component";
import { RemoveProductComponent } from "../product/remove-product/remove-product.component";
import { ProductDisplayComponent } from "../product/product-display/product-display.component";
import { AdminProductDetails } from "../product/product-details/product-details.component";
import { ProductsListComponent } from "../product/products-list/products-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CustomerListComponent } from "../users/customer/customer-list/customer-list.component";

export const adminRoutes: Routes = [
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
];