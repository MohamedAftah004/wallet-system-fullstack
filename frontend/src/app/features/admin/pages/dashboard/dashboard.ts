import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../../layout/sidebar/sidebar';

interface User {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
}

interface UserResponse {
  items: User[];
  page: number;
  size: number;
  totalCount: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;
  activeUsers = 0;
  totalTransactions = 0;
  totalBalance = 0;
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<UserResponse>('https://localhost:7124/api/Users?page=1&size=100').subscribe({
      next: (res) => {
        const users = res.items || [];
        this.totalUsers = res.totalCount ?? users.length;
        this.activeUsers = users.filter((u) => u.status === 'Active').length;

        this.totalTransactions = Math.floor(Math.random() * 300) + 50;
        this.totalBalance = Math.floor(Math.random() * 200000) + 5000;

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading stats:', err);
        this.errorMessage = '❌ Failed to load dashboard data.';
        this.loading = false;
      },
    });
  }
}
