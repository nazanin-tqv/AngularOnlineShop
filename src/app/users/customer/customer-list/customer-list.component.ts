import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Customer } from '../../../user/user.model';
import { DataService } from '../../../data.service';
import { UserNamePipe } from './customer-list.pipe';
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [TableModule, UserNamePipe],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent {
  customers!: Customer[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchCustomerListObservable().subscribe({
      next: (response) => {
        this.customers = response;
      },
    });
  }
}
