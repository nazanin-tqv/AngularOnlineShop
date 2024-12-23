import { Category, Product } from '../product.model';
import { DataService } from '../../data.service';
import { Component, inject, viewChild } from '@angular/core';
import { Table, TableRowSelectEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../products-service.service';
import { Router } from '@angular/router';
interface Column {
  field: string;
  header: string;
}
interface TableProduct {
  name: string;
  brand: string;
  categories: string;
  summary: string;
  quantity: number;
  image: string;
  id: string;
  description: string;
  price: number;
}
@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css',
})
export class ProductDisplayComponent {
  private dt = viewChild<Table>('dt');
  selectedProduct?: TableProduct;
  products: TableProduct[] = [];
  private productService = inject(ProductsService);
  quantites!: number[];

  cols!: Column[];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.fetchProductObservable().subscribe({
      next: (response) => {
        this.dataService.setProducts(response);
        this.products = this.dataService.getProducts.map((p) => ({
          name: p.name,
          brand: p.brand,
          categories: p.categories.map((c) => c.label).join(' ،'),
          summary: p.summary,
          quantity: p.quantity,
          image: p.image,
          id: p.id,
          description: p.description,
          price: p.price,
        }));
      },
    });
  }

  clear(table: Table) {
    table.clear();
  }
  onProductSelection(event: TableRowSelectEvent) {
    console.log(event.data);
    const product = {
      id: this.selectedProduct?.id,
      name: this.selectedProduct?.name,
      brand: this.selectedProduct?.brand,
      summary: this.selectedProduct?.summary,
      categories: this.dataService.getProducts.find(
        (p) => p.id === this.selectedProduct?.id
      )?.categories as Category[],
      description: this.selectedProduct?.description,
      price: this.selectedProduct?.price,
      quantity: this.selectedProduct?.quantity,
      image: this.selectedProduct?.image,
    } as Product;
    this.productService.setSelectedProduct(product);
    const formattedName = product.name.replace(/\s+/g, '-'); // Replace spaces with hyphens for clean URLs

    this.router.navigate([
      'admin-panel',
      'products',
      'display-products',
      product.id,
      formattedName,
    ]);
  }

  filterGlobal(event: Event) {
    const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.dt()?.filterGlobal(input.value, 'contains');
  }
  isEmpty() {
    return this.products.length === 0;
  }
}
