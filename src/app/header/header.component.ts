import {
  Component,
  ElementRef,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import {
  FormControl,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderService } from './header.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { DataService } from '../data.service';
import { Product } from '../product/product.model';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    //Menubar,
    ButtonModule,
    InputTextModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl('');
  products = signal<Product[]>([]);

  constructor(
    private dataService: DataService,
    private router: Router,
    private headerService: HeaderService
  ) {}
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(700)) // 500ms delay
      .subscribe({
        next: (value) => {
          this.headerService.setEnteredSearchInput = value ?? '';
        },
      });
  }

  private form = viewChild<ElementRef<NgForm>>('form'); // added for resetting purpose

  onSearch() {
    const searchInput = this.headerService.getSearchInput;
    this.router.navigate(['search', searchInput]);

    this.headerService.setSearchDone = true;
    console.log(`Searched Item is: ${searchInput}`);
    this.form()?.nativeElement.reset();
  }
}
