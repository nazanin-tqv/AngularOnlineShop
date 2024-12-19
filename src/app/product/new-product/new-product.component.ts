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
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { TreeNode } from 'primeng/api';
import { SharedModule } from './shared.module';
import { ProductsService } from '../products-service.service';
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
  pId?: string;
  url = `https://firestore.googleapis.com/v1/projects/onlineshop-6dac9/databases/(default)/documents/assets/${this.pId}`;
  // Dynamic list of brands
  brands: string[] = [];
  categoryList: TreeNode[] = categoryList;
  categoryBrandMapping = categoryBrandMapping;
  selectedCategories: TreeNode[] = [];
  form = viewChild<HTMLFormElement>('form');
  fileupload = viewChild<FileUpload>('fileUpload');
  productForm = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    image: new FormControl<string>('', {
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

  onCategoryChange() {
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
    this.fileupload()?.upload();
  }

  onReset() {
    this.form()?.reset();
  }

  onUpload(event: FileUploadHandlerEvent): void {
    const uploadedFiles = event.files;
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
    this.pId = this.productService.generateProductId(
      enteredName ?? '',
      enteredBrand ?? '',
      enteredCategories?.join(',') ?? ''
    );
    console.log(`Product name: ${enteredName} brand: ${enteredBrand}`);
    console.log(`Categories: ${enteredCategories?.map((v) => v.value)}`);
    console.log(`Description: ${enteredDescription}`);
    if (uploadedFiles && uploadedFiles.length > 0) {
      const file = uploadedFiles[0];

      // Convert file to Base64
      this.fileToBase64(file).then((base64: string) => {
        this.productForm.get('image')?.setValue(base64);

        // Call the backend service to upload the file
        this.dataService.uploadProductImg(event, this.pId ?? '').subscribe({
          next: (response) => {
            console.log(`Image upload response: ${response}`);
            const enteredImage = this.productForm.get('image')?.value;
            if (!enteredImage) {
              console.error('Image upload is not complete.');
              return;
            }

            // Create the product object
            this.createdProduct = {
              name: enteredName as string,
              summary: enteredSummary as string,
              brand: enteredBrand as string,
              description: enteredDescription as string,
              categories: enteredCategories as Category[],
              image: enteredImage as string,
              id: this.pId,
              price: 1000,
              quantity: 10,
            } as Product;

            this.dataService.addProductHTTP(this.createdProduct);
          },
          error: (err) => {
            console.error('Error uploading image:', err);
          },
        });
      });
      this.form()?.reset();
    }
  }

  // Helper to convert a File to Base64
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
