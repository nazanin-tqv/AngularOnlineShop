import { inject, Injectable, signal } from '@angular/core';
import { ProductsService } from '../product/products-service.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private searchDone = signal<boolean>(false);
  private enteredSearchInput = signal<string>('');
  set setSearchDone(b: boolean) {
    this.searchDone.set(b);
  }
  
  get getSearchDone() {
    return this.searchDone();
  }
  set setEnteredSearchInput(v: string) {
    this.enteredSearchInput.set(v);
  }
  get getSearchInput() {
    return this.enteredSearchInput();
  }
}
