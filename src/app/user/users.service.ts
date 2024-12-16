import { inject, Injectable } from '@angular/core';
import { User } from './user.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private dataService = inject(DataService);
  private customers = this.dataService.getCustomers;
  private admins = this.dataService.getAdmins;
  generateCId() {
    const ul = this.customers.length;
    var popSize = 0;
    if (!(typeof ul === 'undefined')) {
      popSize = ul;
    }
    popSize += 1;

    return `c${popSize}`;
  }
  generateAId() {
    const ul = this.admins.length;
    var popSize = 0;
    if (!(typeof ul === 'undefined')) {
      popSize = ul;
    }
    popSize += 1;
    return `a${popSize}`;
  }
}
