import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { ButtonModule } from 'primeng/button';
import { CategoryFormatPipe } from '../../product/product-details/category-format.pipe';
import { Product } from '../../product/product.model';
@Component({
  selector: 'shared-product-details',
  standalone: true,
  imports: [CategoryFormatPipe, ButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class SharedProductDetails {
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
}
