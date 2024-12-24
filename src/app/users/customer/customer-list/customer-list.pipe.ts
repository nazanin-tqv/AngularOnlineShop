import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName',
  standalone: true,
})
export class UserNamePipe implements PipeTransform {
  transform(value: { fname: string; lname: string }): string {
    return `${value.fname} ${value.lname}`;
  }
}
