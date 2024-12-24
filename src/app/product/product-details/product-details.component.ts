import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../product.model';
import { DataService } from '../../data.service';
import { ButtonModule } from 'primeng/button';
import { SharedProductDetails } from '../../shared/product/product.component';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ButtonModule, SharedProductDetails],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class AdminProductDetails {
  constructor(private router: Router) {}

  private dataService = inject(DataService);
  product?: Product;
  id?: string;
  ngOnInit() {
    const url = this.router.url;
    const segments = url.split('/');
    this.id = segments[segments.length - 2];
    this.dataService.fetchProductObservableById(this.id ?? '').subscribe({
      next: (response) => {
        console.log(`product response: ${response}`);
        this.product = response;
      },
    });
    console.log(this.product?.image);
    console.log(this.product);
  }
  onEditProduct() {
    const formattedName = this.product?.name.replace(/\s+/g, '-'); // Replace spaces with hyphens for clean URLs

    this.router.navigate([
      'admin-panel',
      'products',
      'edit-product',
      this.product?.id,
      formattedName,
    ]);
  }

  onRemoveProduct(): void {
    if (confirm('آیا از حذف محصول مطمئنید؟')) {
      // Add logic to remove the admin from the backend here
      this.dataService.deleteAdmin(this.product?.id ?? '');
      alert('حذف موفقیت آمیز بود');
      this.router.navigate(['/admin-panel/products']); // Redirect to the admin list page
    }
  }
}
