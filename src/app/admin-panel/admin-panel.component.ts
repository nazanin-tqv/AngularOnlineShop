import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarComponent } from './sidebar/sidebar.component';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [PanelMenuModule, RouterOutlet],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class AdminPanelComponent {
  items?: MenuItem[];
  ngOnInit() {
    this.items = [
      {
        label: 'داشبورد',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: 'dashboard',
      },
      {
        label: 'محصولات',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'محصولات موجود',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'products/display-products',
          },
          {
            label: 'اضافه کردن محصول جدید',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'products/add-product',
          },
          {
            label: 'حذف محصول',
            icon: 'pi pi-fw pi-minus',
            routerLink: 'products/remove-product',
          },
          {
            label: 'ویرایش محصول',
            icon: 'pi pi-fw pi-pencil',
            routerLink: 'products/edit-product/',
          },
        ],
      },
      {
        label: 'ادمین ها',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'لیست ادمین ها',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: 'admins/display-admins',
          },
          {
            label: 'اضافه کردن ادمین جدید',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: 'admins/add-admin',
          },
          {
            label: 'حذف ادمین',
            icon: 'pi pi-fw pi-user-minus',
            routerLink: 'admins/remove-admin',
          },
        ],
      },
      {
        label: 'مشتریان',
        icon: 'pi pi-fw pi-user',
        routerLink: 'customers',
      },
    ];
  }
}
