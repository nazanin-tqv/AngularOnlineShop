import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../product.model';
import { DataService } from '../../data.service';
import { ButtonModule } from 'primeng/button';
import { SharedProductDetails } from '../../shared/product/product.component';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ButtonModule, RouterLink, SharedProductDetails],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class AdminProductDetails {
  constructor(private router: Router) {}

  private dataService = inject(DataService);
  product?: Product;
  ngOnInit() {
    const url = this.router.url;
    const id = url.split('/').pop();
    this.dataService.fetchProductObservableById(id ?? '').subscribe({
      next: (response) => {
        console.log(`product response: ${response}`);
        this.product = response;
      },
    });
    console.log(this.product?.image);
    console.log(this.product);
  }
  onEditProduct() {
    this.router.navigate([
      'admin-panel',
      'products',
      'edit-product',
      this.product?.id,
    ]);
  }
}
