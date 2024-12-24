import { Component } from '@angular/core';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { Admin } from '../../../user/user.model';
import { DataService } from '../../../data.service';
import { UserNamePipe } from '../../customer/customer-list/customer-list.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [TableModule, UserNamePipe],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css',
})
export class AdminListComponent {
  admins!: Admin[];
  selectedAdmin?: Admin;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.fetchAdminListObservable().subscribe({
      next: (response) => (this.admins = response),
    });
  }
  onAdminSelection(event: TableRowSelectEvent) {
    console.log(event.data);
    const admin = {
      id: this.selectedAdmin?.id,
      name: this.selectedAdmin?.name,

      email: this.selectedAdmin?.email,
      password: this.selectedAdmin?.password,
    } as Admin;
    const formattedName =
      `${admin.name['fname']}-${admin.name['lname']}`.replace(/\s+/g, '-'); // Replace spaces with hyphens for clean URLs

    this.router.navigate([
      'admin-panel',
      'admins',
      'remove-admin',
      admin.id,
      formattedName,
    ]);
  }
}
