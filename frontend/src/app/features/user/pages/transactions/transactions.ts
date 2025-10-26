import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  loading = true;
  errorMessage = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    sessionStorage.setItem('accessToken', 'test-token');
    const token = sessionStorage.getItem('accessToken');
    const walletId = sessionStorage.getItem('walletId');

    if (!token || !walletId) {
      this.errorMessage = '⚠️ Session expired. Please login again.';
      this.loading = false;
      return;
    }

    this.loadTransactions(walletId, token, this.currentPage);
  }

  loadTransactions(walletId: string, token: string, page: number) {
    this.loading = true;
    const url = `https://localhost:7124/api/Transactions/wallets/${walletId}/transactions?page=${page}&size=${this.pageSize}`;

    this.http.get<any>(url, { headers: { Authorization: `Bearer ${token}` } }).subscribe({
      next: (res) => {
        this.transactions = res.items || [];
        this.totalItems = res.totalCount || 0;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.loading = false;

        if (this.transactions.length === 0) {
          this.errorMessage = '🕊️ No transactions found.';
        } else {
          this.errorMessage = '';
        }
      },
      error: (err) => {
        console.error('❌ Error loading transactions:', err);
        this.errorMessage = '⚠️ Failed to load transactions. Please try again.';
        this.loading = false;
      },
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    const token = sessionStorage.getItem('accessToken');
    const walletId = sessionStorage.getItem('walletId');
    if (!token || !walletId) return;

    this.currentPage = page;
    this.loadTransactions(walletId, token, page);
  }
}
