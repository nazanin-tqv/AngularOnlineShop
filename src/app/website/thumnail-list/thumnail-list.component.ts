import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { DataService } from '../../data.service';
import { DataView } from 'primeng/dataview';
import { Product } from '../../product/product.model';
import { CategoryFormatPipe } from '../../product/product-details/category-format.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thumnail-list',
  standalone: true,
  imports: [DataView, ButtonModule, Tag, CommonModule, CategoryFormatPipe],
  templateUrl: './thumnail-list.component.html',
  styleUrl: './thumnail-list.component.css',
})
export class ThumnailListComponent {
  products = signal<Product[]>([]);

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.fetchProductObservable().subscribe((data) => {
      this.products.set(data);
    });
  }
  onProductSelect(item: any): void {
    // Navigate to the product details page with the product ID
    this.router.navigate(['/product', item.id]);
  }
}
