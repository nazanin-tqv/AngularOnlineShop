import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat',
  standalone: true,
})
export class MoneyFormatPipe implements PipeTransform {
  transform(value: string): string {
    return `${value} تومان`;
  }
}
