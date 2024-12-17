import { Product } from '../product.model';
import { DataService } from '../../data.service';
import { Component, inject, OnInit, viewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule, NgFor } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { StockService } from '../stock.service';
import { CategoryFormatPipe } from './category-format.pipe';
interface Column {
  field: string;
  header: string;
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
    CategoryFormatPipe,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css',
})
export class ProductDisplayComponent {
  private dt = viewChild<Table>('dt');
  products: Product[] = [];
  private stockService = inject(StockService);
  names!: string[];
  brands!: string[];
  summaries!: string[];
  descriptions!: string[];
  categoriesList!: string[];
  quantites!: number[];

  cols!: Column[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchProductObservable().subscribe({
      next: (response) => {
        this.dataService.setProducts(response);
        this.products = this.dataService.getProducts;
        this.mapProductData();
      },
    });

    this.cols = [
      { field: 'name', header: 'نام محصول' },
      { field: 'brand', header: 'برند' },
      { field: 'summary', header: 'خلاصه' },
      { field: 'description', header: 'توضیحات' },
      { field: 'categories', header: 'دسته بندی' },
      { field: 'quantity', header: 'تعداد موجود' },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  mapProductData() {
    const rawProducts = this.products;
    this.names = rawProducts.map((p) => p.name);
    this.brands = rawProducts.map((p) => p.brand);
    this.summaries = rawProducts.map((p) => p.summary);
    this.descriptions = rawProducts.map((p) => p.description);
    this.categoriesList = rawProducts.map((p) => p.categories.join('،'));
    this.quantites = this.stockService.getStockList().map((s) => s.quantity);
  }
  filterGlobal(event: Event) {
    const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.dt()?.filterGlobal(input.value, 'contains');
  }
  isEmpty() {
    return this.products.length === 0;
  }
}
