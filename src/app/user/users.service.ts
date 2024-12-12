import { inject, Injectable } from '@angular/core';
import { User } from './user.model';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private dataService = inject(DataService);
  generateCId() {
    const ul = this.dataService.getCustomers?.length;
    var popSize = 0;
    if (!(typeof ul === 'undefined')) {
      popSize = ul;
    }

    return `c${popSize + 1}`;
  }
  generateAId() {
    const ul = this.dataService.getAdmins?.length;
    var popSize = 0;
    if (!(typeof ul === 'undefined')) {
      popSize = ul;
    }

    return `a${popSize + 1}`;
  }
}
