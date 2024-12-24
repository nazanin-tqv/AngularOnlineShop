import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Category, categoryList, Product } from '../../product/product.model';
import { ThumnailListComponent } from '../thumnail-list/thumnail-list.component';
import { DataService } from '../../data.service';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-nav-filter',
  standalone: true,
  imports: [ThumnailListComponent],
  templateUrl: './nav-filter.component.html',
  styleUrl: './nav-filter.component.css',
})
export class NavFilterComponent implements OnInit {
  private routeCategories: string[] = [];
  products = signal<Product[]>([]);
  constructor(
    private router: Router,
    private dataService: DataService,
    private navService: NavbarService
  ) {}
  ngOnInit(): void {
    const url = this.router.url;
    var productFiltered: Product[] = [];
    const segments = url.split('/');
    this.routeCategories = this.navService
      .mapPathToPersian(segments)
      .filter((e) => e !== '' && e !== 'categories');
    console.log(`route categories:${this.routeCategories}`);
    console.log('recieving');
    this.dataService.fetchProductObservable().subscribe({
      next: (data) => {
        this.products.set(data);
        this.dataService.setProducts(data);
        if (this.routeCategories) {
          const catSet = new Set(this.routeCategories);
          productFiltered = this.products().filter((p) =>
            this.routeCategories.every((c) =>
              p.categories.some((cat) => cat.label === c)
            )
          );
        }
        this.products.set(productFiltered);
      },
    });
  }
}
