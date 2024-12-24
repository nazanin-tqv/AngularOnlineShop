import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { ThumnailListComponent } from '../thumnail-list/thumnail-list.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TreeNode } from 'primeng/api';
import {
  Category,
  categoryBrandMapping,
  categoryList,
  Product,
} from '../../product/product.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { TreeSelect } from 'primeng/treeselect';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ThumnailListComponent,
    CommonModule,
    FormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    Select,
    TreeSelect,
    FormsModule,
    ReactiveFormsModule,
    ThumnailListComponent,
    InputTextModule,
    NavbarComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class WebsiteProductsComponent {
  searchTerm?: string = '';
  form = viewChild<ElementRef<HTMLFormElement>>('form');
  categoryList: TreeNode[] = categoryList;
  categoryBrandMapping = categoryBrandMapping;
  selectedCategories?: TreeNode[];
  selectedBrand?: string;
  brands: string[] = [];
  products = signal<Product[]>([]);
  original = signal<Product[]>([]);
  filterForm = new FormGroup({
    search: new FormControl<string>(''),
    brand: new FormControl<string>(''),
    categories: new FormControl<Category[]>([]),
  });
  routeCategories: string[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (this.dataService.getProducts.length === 0) {
      console.log('recieving');
      this.dataService.fetchProductObservable().subscribe((data) => {
        this.products.set(data);
        this.dataService.setProducts(data);
      });
    } else {
      console.log('already have ir');
      this.products.set(this.dataService.getProducts);
    }

    this.original.set(this.products());
  }
  onCategoryChange() {
    const selectedCategories = this.filterForm.value.categories?.map(
      (category: TreeNode) => category.label
    );

    this.brands = this.getBrandsForCategories(
      selectedCategories?.filter((c) => typeof c !== 'undefined') as string[]
    );
  }
  getBrandsForCategories(categories: string[]): string[] {
    let availableBrands: string[] = [];
    categories.forEach((category) => {
      console.log(category);
      if (this.categoryBrandMapping[category]) {
        availableBrands = [
          ...availableBrands,
          ...this.categoryBrandMapping[category],
        ];
      }
    });
    return [...new Set(availableBrands)]; // Remove duplicates if any
  }

  onFilter() {
    this.original.set(this.products());
    const selectedCategories = this.filterForm.value.categories?.map(
      (category: TreeNode) => category.label
    );
    this.selectedBrand = this.filterForm.value.brand as string;
    this.searchTerm = (this.filterForm.value.search as string) ?? '';

    const productCopy = this.products();
    var searchSubset: Product[] = [];
    var brandSubset: Product[] = [];
    var categorySubSet: Product[] = [];

    if (this.searchTerm != '') {
      searchSubset = productCopy.filter((p) =>
        p.name.includes(this.searchTerm as string)
      );
    }
    if (this.selectedBrand) {
      brandSubset = productCopy.filter((p) => p.brand === this.selectedBrand);
    }
    if (selectedCategories) {
      const catSet = new Set(selectedCategories);
      categorySubSet = productCopy.filter((p) =>
        p.categories.some((c) => catSet.has(c.label))
      );
    }
    const finalSet = new Set([
      ...searchSubset,
      ...brandSubset,
      ...categorySubSet,
    ]);
    this.products.set([...finalSet]);
  }
  reset() {
    this.products.set(this.original());
    this.form()?.nativeElement.reset();
  }
}
