import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { NavbarService } from './navbar.service';
@Component({
  selector: 'website-navbar',
  standalone: true,
  imports: [Menubar, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  private navService = inject(NavbarService);
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
        routerLink: ['product-list'],
      },
      {
        label: 'دسته بندی',
        icon: 'pi pi-search',
        routerLink: ['categories'],
        items: [
          {
            label: 'کالای دیجیتال',
            icon: 'pi pi-bolt',
            routerLink: ['categories', 'digital'],
            items: [
              {
                label: 'موبایل',
                icon: 'pi pi-phone',
                routerLink: ['categories', 'digital', 'mobile'],
              },
              {
                label: 'تبلت',
                icon: 'pi pi-tablet',
                routerLink: ['categories', 'digital', 'tablet'],
              },
              {
                label: 'لپتاپ',
                icon: 'pi pi-laptop',
                routerLink: ['categories', 'digital', 'laptop'],
              },
            ],
          },
          {
            label: 'پوشاک',
            icon: 'pi pi-server',
            routerLink: ['categories', 'clothing'],
            items: [
              {
                label: 'زنانه',
                icon: 'pi pi-female',
                routerLink: ['categories', 'clothing', 'women'],
              },
              {
                label: 'مردانه',
                icon: 'pi pi-male',
                routerLink: ['categories', 'clothing', 'men'],
              },
              {
                label: 'بچگانه',
                icon: 'pi pi-child',
                routerLink: ['categories', 'clothing', 'children'],
              },
            ],
          },
        ],
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-info-circle',
        routerLink: ['about-us'],
      },
      {
        label: 'تماس با ما',
        icon: 'pi pi-envelope',
        routerLink: ['contact-us'],
      },
    ];
    this.navService.setItems(this.items);
  }
}
