import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeTitle',
  standalone: true,
})
export class TypeTitlePipe implements PipeTransform {
  transform(value: 'admin' | 'customer'): string {
    return value === 'admin' ? 'ادمین' : 'مشتری گرامی';
  }
}
