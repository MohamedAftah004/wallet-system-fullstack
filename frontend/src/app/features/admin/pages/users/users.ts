import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { UserDetailsModalComponent } from '../../../../components/user-details-modal/user-details-modal.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SidebarComponent, UserDetailsModalComponent],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  totalUsers = 0;
  activeUsers = 0;
  blockedUsers = 0;
  loading = true;
  selectedUser: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.http.get<any>('https://localhost:7124/api/Users?page=1&size=50').subscribe({
      next: (res) => {
        this.users = res.items || [];
        this.totalUsers = res.totalCount || this.users.length;
        this.activeUsers = this.users.filter((u: any) => u.status === 'Active').length;
        this.blockedUsers = this.users.filter((u: any) => u.status !== 'Active').length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.loading = false;
      },
    });
  }

  openUserDetails(user: any) {
    this.selectedUser = user;
  }

  handleUserAction(event: { type: string; userId: string }) {
    const { type, userId } = event;
    const url = `https://localhost:7124/api/Users/${userId}/${type}`;

    console.log('🟢 Sending action request to:', url);

    this.http.patch(url, {}).subscribe({
      next: () => {
        console.log(`✅ ${type.toUpperCase()} executed for user ${userId}`);
        alert(`✅ User ${type}d successfully!`);
        this.selectedUser = null;
        this.loadUsers();
      },
      error: (err) => {
        console.error(`❌ Error executing ${type} for user ${userId}`, err);
        alert(`❌ Failed to ${type} user.`);
      },
    });
  }
}
