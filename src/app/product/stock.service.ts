import { inject, Injectable, OnInit, signal } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from './product.model';

export interface ProductStock {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class StockService implements OnInit {
  private dataService = inject(DataService);
  private stockList = signal<ProductStock[]>([]);
  products = this.dataService.getProducts;
  ngOnInit(): void {
    this.stockList.set(
      this.products.map((p) => ({ product: p, quantity: 10 } as ProductStock)) // TODO must be added to db
    );
  }
  getStockList() {
    return this.stockList();
  }
  addStock(stock: ProductStock) {
    const prev = this.stockList();
    this.stockList.update(() => [...prev, stock]);
  }
  getProductQuantity(product: Product) {
    const stock = this.stockList().find((s) => s.product.id === product.id);
    return stock?.quantity;
  }
  addProductQuantityByn(product: Product, n: number) {
    var stock = this.stockList().find((s) => s.product.id === product.id);
    const prev = this.stockList().filter((s) => s.product.id !== product.id);
    var prevQuantity = 0;
    if (typeof stock !== 'undefined') {
      prevQuantity = stock?.quantity;
      stock.quantity = prevQuantity + n;
      this.stockList.update(() => [...prev, stock as ProductStock]);
    }
  }
  reduceProductQuantityByn(product: Product, n: number) {
    var stock = this.stockList().find((s) => s.product.id === product.id);
    const prev = this.stockList().filter((s) => s.product.id !== product.id);
    var prevQuantity = 0;
    if (typeof stock !== 'undefined') {
      prevQuantity = stock.quantity;
      if (prevQuantity >= n) {
        stock.quantity = prevQuantity - n;
      } else {
        console.log('not enough product');
      }
      if (stock?.quantity == 0) {
        this.stockList.update(() => [...prev]);
      } else {
        this.stockList.update(() => [...prev, stock as ProductStock]);
      }
    }
  }
}
