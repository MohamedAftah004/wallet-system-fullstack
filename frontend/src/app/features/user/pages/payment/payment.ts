import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss'],
})
export class PaymentComponent implements OnInit {
  amount: number | null = null;
  description: string = '';
  successMessage = '';
  errorMessage = '';
  loading = false;
  isDisabled = false;
  userStatus: string = '';
  supportEmail = 'mohamedaftah04@gmail.com';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userStatus = sessionStorage.getItem('status') || '';
    this.setStatusMessage();
  }

  setStatusMessage() {
    switch (this.userStatus) {
      case 'PendingActivation':
        this.errorMessage = `
          🔐 Your account isn't activated yet.<br>
          Please check your email for activation instructions or contact 
          <a href="mailto:${this.supportEmail}" class="support-link">support</a> for help.
        `;
        this.isDisabled = true;
        break;

      case 'Frozen':
        this.errorMessage = `
          ❄️ Your account is temporarily frozen.<br>
          Please reach out to 
          <a href="mailto:${this.supportEmail}" class="support-link">admin support</a> to unlock it.
        `;
        this.isDisabled = true;
        break;

      case 'Disabled':
        this.errorMessage = `
          🚫 Your account has been disabled.<br>
          Contact 
          <a href="mailto:${this.supportEmail}" class="support-link">administrator</a> 
          if you believe this is a mistake.
        `;
        this.isDisabled = true;
        break;

      case 'Closed':
        this.errorMessage = `
          ⚠️ Your account is closed and can’t be used for transactions.<br>
          If you’d like to reopen it, please email 
          <a href="mailto:${this.supportEmail}" class="support-link">support</a>.
        `;
        this.isDisabled = true;
        break;

      default:
        this.isDisabled = false;
        this.errorMessage = '';
        break;
    }
  }

  makePayment() {
    if (this.isDisabled) return;

    const walletId = sessionStorage.getItem('walletId');
    const token = sessionStorage.getItem('accessToken');

    if (!walletId || !token) {
      this.errorMessage = '⚠️ Session expired. Please login again.';
      return;
    }

    if (!this.amount || this.amount <= 0) {
      this.errorMessage = '⚠️ Please enter a valid amount.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const url = 'https://localhost:7124/api/Transactions/payment';
    const body = {
      walletId,
      amount: this.amount,
      description: this.description || 'Payment transaction',
    };
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.post(url, body, { headers }).subscribe({
      next: (response) => {
        this.successMessage = '✅ Payment completed successfully!';
        this.loading = false;
        this.amount = null;
        this.description = '';
      },
      error: (err) => {
        console.error('❌ Payment failed:', err);
        this.errorMessage = '❌ Payment failed. Please try again.';
        this.loading = false;
      },
    });
  }
}
