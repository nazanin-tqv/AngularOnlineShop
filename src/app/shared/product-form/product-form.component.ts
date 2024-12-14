import { Component, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { TreeSelect } from 'primeng/treeselect';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { TreeNode } from 'primeng/api';
import { from } from 'rxjs';
import { Brand, Category, categoryList } from '../../product/product.model';
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
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class SharedProductForm {
  brands = ['اپل', 'سامسونگ', 'شیائومی', 'پیکسل', 'سونی'];
  categoryList: TreeNode[] = categoryList;
  selectedCategories: TreeNode[] = [];
  form = viewChild<HTMLFormElement>('form');
  productForm = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    image: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
    summary: new FormControl<string>('', { validators: [Validators.required] }),
    brand: new FormControl<Brand>(Brand.Apple, {
      validators: Validators.required,
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    categories: new FormControl<Category[]>([]),
  });
  onAddProduct() {
    const val = this.productForm.value;
    const enteredName = val.name;
    const enteredSummary = val.summary;
    const enteredBrand = val.brand;
    const enteredDescription = val.description;
    const enteredCategories = this.productForm.get('categories')?.value;
    console.log(`Product name: ${enteredName} brand: ${enteredBrand}`);
    console.log(`Categories: ${enteredCategories?.map((v) => v.value)}`);
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
