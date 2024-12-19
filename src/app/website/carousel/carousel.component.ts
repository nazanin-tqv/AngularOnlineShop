import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Product } from '../../product/product.model';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [Carousel, ButtonModule, Tag],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  products: Product[] = [];

  responsiveOptions: any[] | undefined;

  constructor(
    private dataServie: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataServie.fetchProductObservable().subscribe({
      next: (products) => {
        this.products = products;
        console.log(`number of products: ${this.products.length}`);
        this.cdr.detectChanges();
      },
    });
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
