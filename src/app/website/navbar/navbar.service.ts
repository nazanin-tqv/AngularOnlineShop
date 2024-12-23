import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private items!: MenuItem[];
  setItems(items: MenuItem[]) {
    this.items = items;
  }
  constructor() {}
  mapRouterLinkToLabels(pathArray: string[]): string[] {
    const pathLabelMap: Record<string, string> = {};

    function traverse(items: MenuItem[]) {
      for (const item of items) {
        if (item.routerLink) {
          const path = item.routerLink[item.routerLink.length - 1];
        }

        if (item.items) {
          traverse(item.items);
        }
      }
    }

    traverse(this.items);

    return pathArray.map((path, index) =>
      pathLabelMap[path] ? pathLabelMap[path] : index.toString()
    );
  }
  translationMap: Record<string, string> = {
    mobile: 'موبایل',
    tablet: 'تبلت',
    laptop: 'لپتاپ',
    digital: 'کالای دیجیتال',
    clothing: 'پوشاک',
    women: 'زنانه',
    men: 'مردانه',
    children: 'بچگانه',
    'product-list': 'لیست محصولات',
    home: 'خانه',
    'about-us': 'درباره ما',
    'contact-us': 'تماس با ما',
  };
  mapPathToPersian(
    pathSegments: string[],
  ): string[] {
    return pathSegments.map((segment) => this.translationMap[segment] || segment);
  }
}
