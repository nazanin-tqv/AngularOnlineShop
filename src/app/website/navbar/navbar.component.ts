import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
@Component({
  selector: 'website-navbar',
  standalone: true,
  imports: [Menubar, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'خانه',
        icon: 'pi pi-home',
        routerLink: ['/'],
      },
      {
        label: 'محصولات',
        icon: 'pi pi-star',
        routerLink: ['/product-list'],
      },
      {
        label: 'دسته بندی',
        icon: 'pi pi-search',
        items: [
          {
            label: 'کالای دیجیتال',
            icon: 'pi pi-bolt',
            items: [
              { label: 'موبایل', icon: 'pi pi-phone' },
              { label: 'تبلت', icon: 'pi pi-computer' },
              { label: 'لپتاپ', icon: 'pi pi-phone' },
            ],
          },
          {
            label: 'پوشاک',
            icon: 'pi pi-server',
            items: [
              { label: 'زنانه', icon: 'pi pi-phone' },
              { label: 'مردانه', icon: 'pi pi-phone' },
              { label: 'بجگانه', icon: 'pi pi-phone' },
            ],
          },
          {
            label: 'فرهنگی',
            icon: 'pi pi-pencil',
            items: [
              { label: 'کتاب', icon: 'pi pi-phone' },
              { label: 'لوازم تحریر', icon: 'pi pi-phone' },
            ],
          },
          {
            label: 'درباره ما',
            icon: 'pi pi-palette',
            routerLink: [''],
          },
        ],
      },
      {
        label: 'تماس با ما',
        icon: 'pi pi-envelope',
        routerLink: [''],
      },
    ];
  }
}
