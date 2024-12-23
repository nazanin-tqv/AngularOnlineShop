import { Component, inject } from '@angular/core';
import { SharedProductDetails } from '../../shared/product/product.component';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../data.service';
import { Product } from '../../product/product.model';

@Component({
  selector: 'website-product-detail',
  standalone: true,
  imports: [SharedProductDetails, ButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class WebsiteProductDetails {
  product?: Product;
  constructor(private router: Router, private dataService: DataService) {}
  ngOnInit() {
    const url = this.router.url;
    const segments = url.split('/');
    const id = segments[segments.length - 2];
    this.dataService.fetchProductObservableById(id ?? '').subscribe({
      next: (response) => {
        console.log(`product response: ${response}`);
        this.product = response;
      },
    });
    console.log(this.product);
  }
  onBuy() {}
}
