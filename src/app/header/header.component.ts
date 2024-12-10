import { Component, inject, input, NgModule, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FormsModule, NgModel } from '@angular/forms';
import { HeaderService } from './header.service';
import { ProductsService } from '../product/products-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Menubar,
    ButtonModule,
    InputTextModule,
    IconField,
    InputIcon,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  enteredSearch = input<string>('');
  private headerService = inject(HeaderService);
  onSearch() {
    this.headerService.setSearchDone = true;
    this.headerService.setEnteredSearchInput = this.enteredSearch();
  }
}
