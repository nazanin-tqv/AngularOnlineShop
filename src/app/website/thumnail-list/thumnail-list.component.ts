import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataView } from 'primeng/dataview';
import { Product } from '../../product/product.model';
import { CategoryFormatPipe } from '../../product/product-details/category-format.pipe';
import { Router } from '@angular/router';
import { MoneyFormatPipe } from './money-format.pipe';

@Component({
  selector: 'website-thumnail-list',
  standalone: true,
  imports: [
    DataView,
    ButtonModule,
    CommonModule,
    CategoryFormatPipe,
    MoneyFormatPipe,
  ],
  templateUrl: './thumnail-list.component.html',
  styleUrl: './thumnail-list.component.css',
})
export class ThumnailListComponent {
  products = input.required<Product[]>();

  constructor(private router: Router) {}

  onProductSelect(item: any): void {
    // Navigate to the product details page with the product ID
    this.router.navigate(['/product', item.id, item.name]);
  }
}
