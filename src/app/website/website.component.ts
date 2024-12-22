import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { CarouselComponent } from './carousel/carousel.component';
import { Fieldset } from 'primeng/fieldset';
import { categoryList, Product } from '../product/product.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [NavbarComponent, SliderComponent, CarouselComponent, Fieldset],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css',
})
export class WebsiteComponent implements OnInit {
  products!: Product[];
  favorites = signal<Product[]>([]);
  clothing!: Product[];
  digital!: Product[];
  culture!: Product[];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.fetchProductObservable().subscribe({
      next: (data) => {
        this.products = data;
        this.clothing = this.products.filter((p) =>
          p.categories.some(
            (c) =>
              c.label === 'پوشاک' ||
              categoryList.some(
                (cat) => cat.label === 'پوشاک' && cat.children?.includes(c)
              )
          )
        );
        this.digital = this.products?.filter((p) =>
          p.categories.some(
            (c) =>
              c.label === 'کالای دیجیتال' ||
              categoryList.some(
                (cat) =>
                  cat.label === 'کالای دیجیتال' && cat.children?.includes(c)
              )
          )
        );
        this.culture = this.products?.filter((p) =>
          p.categories.some(
            (c) =>
              c.label === 'فرهنگی' ||
              categoryList.some(
                (cat) => cat.label === 'فرهنگی' && cat.children?.includes(c)
              )
          )
        );
      },
    });
  }
}
