import { Component, OnInit, signal } from '@angular/core';
import { HeaderService } from '../header.service';
import { Product } from '../../product/product.model';
import { ThumnailListComponent } from '../../website/thumnail-list/thumnail-list.component';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [ThumnailListComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
})
export class SearchResultComponent implements OnInit {
  products = signal<Product[]>([]);
  searchInput = signal<string>('');
  constructor(
    private headerService: HeaderService,
    private dataService: DataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.dataService.getProducts.length == 0) {
      this.dataService.fetchProductObservable().subscribe({
        next: (response) => {
          this.products.set(response);
          this.search();
        },
      });
    } else {
      this.products.set(this.dataService.getProducts);
      this.search();
    }
  }
  search() {
    const copy = this.products();
    var searchInput = this.headerService.getSearchInput;
    if (searchInput === '') {
      this.headerService.setEnteredSearchInput = decodeURIComponent(
        this.router.url.split('/').pop() ?? ''
      );
    }
    this.searchInput.set(this.headerService.getSearchInput);
    console.log('Searching', this.router.url);
    this.products.set(
      copy.filter(
        (p) =>
          p.name.includes(this.searchInput()) ||
          p.brand === this.searchInput() ||
          p.categories.some(
            (c) =>
              c.label === this.searchInput() ||
              c.children?.some((ch) => ch.label === this.searchInput())
          )
      )
    );
  }
}
