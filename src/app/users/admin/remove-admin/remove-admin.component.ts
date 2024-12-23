import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../data.service';
import { Admin } from '../../../user/user.model';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-remove-admin',
  templateUrl: './remove-admin.component.html',
  styleUrls: ['./remove-admin.component.css'],
  imports: [ButtonModule],
  standalone: true,
})
export class RemoveAdminComponent implements OnInit {
  admin?: Admin;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    const url = this.router.url;
    const segments = url.split('/');
    const id = segments[segments.length - 2];
    this.dataService.FetchAdminObservableById(id ?? '').subscribe({
      next: (response) => {
        console.log(`admin response: ${response}`);
        this.admin = response;
      },
    });
    console.log(this.admin);
  }

  removeAdmin(): void {
    if (confirm('آیا از حذف ادمین مطمئنید؟')) {
      // Add logic to remove the admin from the backend here
      this.dataService.deleteAdmin(this.admin?.id ?? '');
      alert('حذف موفقیت آمیز بود');
      this.router.navigate(['/admin-panel/admins']); // Redirect to the admin list page
    }
  }
}
