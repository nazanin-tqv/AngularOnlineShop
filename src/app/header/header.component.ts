import {
  Component,
  ElementRef,
  inject,
  input,
  NgModule,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { HeaderService } from './header.service';
import { ProductsService } from '../product/products-service.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EventEmitter } from 'stream';
import { NgFor } from '@angular/common';

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
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  enteredSearch =
    viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  private form = viewChild<ElementRef<NgForm>>('form'); // added for resetting purpose
  private headerService = inject(HeaderService);
  onSearch() {
    this.headerService.setSearchDone = true;
    this.headerService.setEnteredSearchInput =
      this.enteredSearch()?.nativeElement.value;
    console.log(
      `Searched Item is: ${this.enteredSearch().nativeElement.value}`
    );
    this.form()?.nativeElement.reset();
  }
}
