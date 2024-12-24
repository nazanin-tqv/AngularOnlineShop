import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class SidebarComponent {
  items = [
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
    {
      label: 'خروج',
      icon: 'pi pi-fw pi-exit',
    },
  ];

  openSubmenus: Set<any> = new Set();

  toggleSubmenu(item: any): void {
    if (this.openSubmenus.has(item)) {
      this.openSubmenus.delete(item);
    } else {
      this.openSubmenus.add(item);
    }
  }

  isSubmenuOpen(item: any): boolean {
    return this.openSubmenus.has(item);
  }
}
