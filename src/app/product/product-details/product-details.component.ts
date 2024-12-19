import { Component, inject } from '@angular/core';
import { CategoryFormatPipe } from './category-format.pipe';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CategoryFormatPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
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
