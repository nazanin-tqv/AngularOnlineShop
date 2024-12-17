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
import { CommonModule } from '@angular/common';
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
  quantites!: number[];

  cols!: Column[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchProductObservable().subscribe({
      next: (response) => {
        this.dataService.setProducts(response);
        this.products = this.dataService.getProducts;
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

  filterGlobal(event: Event) {
    const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.dt()?.filterGlobal(input.value, 'contains');
  }
  isEmpty() {
    return this.products.length === 0;
  }
}
