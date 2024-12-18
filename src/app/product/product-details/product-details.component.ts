import { Component, inject } from '@angular/core';
import { ProductsService } from '../products-service.service';
import { CategoryFormatPipe } from './category-format.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CategoryFormatPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private productService = inject(ProductsService);
  product = this.productService.selectedProduct;
  ngOnInit() {
    this.product = this.productService.selectedProduct;

    console.log(this.product);
  }
}
