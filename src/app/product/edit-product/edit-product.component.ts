import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { Component, inject, OnInit, viewChild } from '@angular/core';
import {
  AbstractControl,
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
import { SharedModule, TreeNode } from 'primeng/api';
function isEmpty(control: AbstractControl) {
  if (control.value.length > 0) {
    return null;
  } else return { isEmpty: true };
}
@Component({
  selector: 'app-edit-product',
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
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  url = '';

  private dataService = inject(DataService);
  product?: Product;
  editedProduct?: Product;
  constructor(private router: Router) {}
  brands: string[] = [];
  categoryList: TreeNode[] = categoryList;
  categoryBrandMapping = categoryBrandMapping;
  selectedCategories: TreeNode[] = [];
  form = viewChild<HTMLFormElement>('form');
  fileupload = viewChild<FileUpload>('fileUpload');

  editForm = new FormGroup({
    summary: new FormControl<string>('', { validators: [isEmpty] }),
    description: new FormControl<string>('', { validators: [isEmpty] }),
    image: new FormControl<string>(''),
  });
  ngOnInit(): void {
    const id = this.router.url.split('/').pop();
    this.url = `https://firestore.googleapis.com/v1/projects/onlineshop-6dac9/databases/(default)/documents/assets/${id}`;
    this.dataService.fetchProductObservableById(id ?? '').subscribe({
      next: (response) => {
        this.product = response;
      },
    });
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
  onEditProduct() {
    this.fileupload()?.upload();
  }

  onReset() {
    this.form()?.reset();
  }

  onUpload(event: FileUploadHandlerEvent): void {
    const uploadedFiles = event.files;
    const val = this.editForm.value;

    console.log('Selected Brands:', this.brands);
    const enteredSummary = val.summary;
    const enteredDescription = val.description;

    console.log(`Description: ${enteredDescription}`);
    if (uploadedFiles && uploadedFiles.length > 0) {
      const file = uploadedFiles[0];

      // Convert file to Base64
      this.fileToBase64(file).then((base64: string) => {
        this.editForm.get('image')?.setValue(base64);

        // Call the backend service to upload the file
        this.dataService
          .uploadProductImg(event, this.product?.id ?? '')
          .subscribe({
            next: (response) => {
              console.log(`Image upload response: ${response}`);
              const enteredImage = this.editForm.get('image')?.value;
              if (!enteredImage) {
                console.error('Image upload is not complete.');
                return;
              }

              // Create the product object
              this.editedProduct = {
                name: this.product?.name as string,
                summary: enteredSummary as string,
                brand: this.product?.brand as string,
                description: enteredDescription as string,
                categories: this.product?.categories as Category[],
                image: enteredImage as string,
                id: this.product?.id,
                price: 1000,
                quantity: 10,
              } as Product;

              this.dataService.addProductHTTP(this.editedProduct);
              console.log('Updated product:', this.editedProduct);
            },
            error: (err) => {
              console.error('Error uploading image:', err);
            },
          });
      });
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
