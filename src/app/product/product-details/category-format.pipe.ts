import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../product.model';

@Pipe({
  name: 'categoryFormat',
  standalone: true,
})
export class CategoryFormatPipe implements PipeTransform {
  transform(categories: Category[]): string {
    console.log(categories);
    return categories.map((c) => c.label).join(' ،');
  }
}
