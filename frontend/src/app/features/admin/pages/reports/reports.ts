import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../layout/sidebar/sidebar';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, SidebarComponent],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
})
export class ReportsComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  totalUsers = 0;
  totalTransactions = 0;
  totalBalance = 0;
  loading = true;
  filterStatus = 'all';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchReports();
  }

  fetchReports() {
    this.loading = true;
    this.http.get<any>('https://localhost:7124/api/Users?page=1&size=20').subscribe({
      next: (res) => {
        this.users = res.items || [];
        this.applyFilter();
        this.totalUsers = res.totalCount || this.users.length;
        this.totalTransactions = Math.floor(Math.random() * 300);
        this.totalBalance = Math.floor(Math.random() * 500000);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading reports:', err);
        this.loading = false;
      },
    });
  }

  applyFilter() {
    this.filteredUsers =
      this.filterStatus === 'all'
        ? this.users
        : this.users.filter((u) => u.status === this.filterStatus);
  }
}
