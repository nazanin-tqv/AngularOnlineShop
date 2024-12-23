import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Category,
  categoryList,
  Product,
} from '../../../product/product.model';
import { ThumnailListComponent } from '../../thumnail-list/thumnail-list.component';
import { DataService } from '../../../data.service';
import { NavbarService } from '../navbar.service';

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
    var productFiltered = signal<Product[]>([]);
    const segments = url.split('/');
    this.routeCategories = this.navService.mapPathToPersian(segments);
    console.log(this.routeCategories);
    this.dataService.fetchProductObservable().subscribe((data) => {
      this.products.set(data);
    });
    if (this.routeCategories) {
      const catSet = new Set(this.routeCategories);
      productFiltered.set(
        this.products().filter((p) =>
          p.categories.some((c) => catSet.has(c.label))
        )
      );

      this.products.set(productFiltered());
    }
  }
}
