import { Component, inject, OnInit, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {
  Brand,
  Category,
  categoryBrandMapping,
  categoryList,
  Product,
} from '../product.model';
import { Select } from 'primeng/select';
import { TreeSelect } from 'primeng/treeselect';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { TreeNode } from 'primeng/api';
import { SharedModule } from './shared.module';
import { ProductsService } from '../products-service.service';
import { pid } from 'process';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    Select,
    TreeSelect,
    FormsModule,
    FileUpload,
    SharedModule,
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  createdProduct?: Product;

  private productService = inject(ProductsService);
  private dataService = inject(DataService);
  pId = this.productService.genarateProductId();
  url = `https://firestore.googleapis.com/v1/projects/onlineshop-6dac9/databases/(default)/documents/assets/${this.pId}`;
  // Dynamic list of brands
  brands: string[] = [];
  categoryList: TreeNode[] = categoryList;
  categoryBrandMapping = categoryBrandMapping;
  selectedCategories: TreeNode[] = [];
  form = viewChild<HTMLFormElement>('form');
  productForm = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    image: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
    summary: new FormControl<string>('', { validators: [Validators.required] }),
    brand: new FormControl<string>('', {
      validators: Validators.required,
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    categories: new FormControl<Category[]>([]),
  });

  // Method to update brands when category is selected
  onCategoryChange() {
    // Check if event.value is an array of TreeNode and map over it
    const selectedCategories = this.productForm.value.categories?.map(
      (category: TreeNode) => category.label
    );

    this.brands = this.getBrandsForCategories(
      selectedCategories?.filter((c) => typeof c !== 'undefined') as string[]
    );
    console.log('Selected Brands:', this.brands);
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
  onAddProduct() {
    const val = this.productForm.value;
    const selectedCategories = this.productForm.value.categories?.map(
      (category: TreeNode) => category.label
    );

    this.brands = this.getBrandsForCategories(
      selectedCategories?.filter((c) => typeof c !== 'undefined') as string[]
    );
    console.log('Selected Brands:', this.brands);
    const enteredName = val.name;
    const enteredSummary = val.summary;
    const enteredBrand = val.brand;
    const enteredDescription = val.description;
    const enteredCategories = this.productForm.get('categories')?.value;
    const uploadedImage = this.productForm.get('image')?.value;
    console.log(`Product name: ${enteredName} brand: ${enteredBrand}`);
    console.log(`Categories: ${enteredCategories?.map((v) => v.value)}`);
    this.createdProduct = {
      name: enteredName as string,
      summary: enteredSummary as string,
      brand: enteredBrand as string,
      description: enteredDescription as string,
      categories: enteredCategories as Category[],
      image: this.url,
      id: this.pId,
      price: 1000,
    };
    this.dataService.addProductHTTP(this.createdProduct);
  }

  onReset() {
    this.form()?.reset();
  }
  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      // Store base64 data for image preview (useful for showing the uploaded image immediately)
      console.log('Image preview', reader.result);
    };
    reader.readAsDataURL(file);
  }

  onUpload(event: FileUploadEvent) {
    const uploadedFiles = event.files;

    // Set the uploaded file to the corresponding FormControl
    this.productForm.get('image')?.setValue(uploadedFiles[0]);

    // You can also handle image preview here if required
    this.previewImage(uploadedFiles[0]);
  }
}
