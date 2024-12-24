import { Route, Routes } from '@angular/router';
import { NavFilterComponent } from '../nav-filter/nav-filter.component';
import { NavOutletComponent } from './nav-outlet/nav-outlet.component';

export const catRoutes: Routes = [
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
];
