import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../../layout/sidebar/sidebar';

@Component({
  selector: 'app-admin-transactions',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SidebarComponent],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  totalTransactions = 0;
  totalAmount = 0;
  loading = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTransactions();
  }

  /** 🔄 تحميل البيانات من الـ API */
  loadTransactions(): void {
    this.loading = true;
    this.errorMessage = null;

    const url = `https://localhost:7124/api/Transactions/recent?page=1&size=20`;

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.transactions = Array.isArray(res) ? res : [];

        this.totalTransactions = this.transactions.length;
        this.totalAmount = this.transactions.reduce((sum, t) => sum + (t.amount || 0), 0);

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading transactions:', err);
        this.errorMessage = 'Failed to load transactions. Please try again.';
        this.loading = false;
      },
    });
  }

  reloadTransactions(): void {
    this.loadTransactions();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed':
        return '#28c76f';
      case 'Pending':
        return '#ffc107';
      case 'Failed':
        return '#ff6b6b';
      case 'Reversed':
        return '#009ffd';
      default:
        return '#ccc';
    }
  }
}
