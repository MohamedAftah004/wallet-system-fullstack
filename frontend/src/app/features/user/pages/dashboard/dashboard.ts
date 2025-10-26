import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  dashboardData: any = null;
  loading = true;
  errorMessage = '';

  userStatus: string = '';
  userStatusMessage: string = '';
  userStatusClass: string = '';
  supportEmail = 'mohamedaftah04@gmail.com';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    this.userStatus = sessionStorage.getItem('status') || '';

    this.setStatusBanner();

    if (!userId) {
      this.errorMessage = '⚠️ No user session found. Please login again.';
      this.loading = false;
      return;
    }

    this.fetchDashboardData(userId);
    this.fetchWalletIdSilently(userId);
  }

  setStatusBanner() {
    switch (this.userStatus) {
      case 'PendingActivation':
        this.userStatusMessage = `⏳ Your account isn't activated yet. Please check your email or contact 
        <a href="mailto:${this.supportEmail}">support</a>.`;
        this.userStatusClass = 'pending';
        break;

      case 'Frozen':
        this.userStatusMessage = `❄️ Your account is temporarily frozen. Contact 
        <a href="mailto:${this.supportEmail}">admin support</a> to unfreeze it.`;
        this.userStatusClass = 'frozen';
        break;

      case 'Disabled':
        this.userStatusMessage = `🚫 Your account has been disabled. Please reach out to 
        <a href="mailto:${this.supportEmail}">administrator</a>.`;
        this.userStatusClass = 'disabled';
        break;

      case 'Closed':
        this.userStatusMessage = `⚠️ Your account is closed and cannot be used for transactions. If you want to reopen it, contact 
        <a href="mailto:${this.supportEmail}">support</a>.`;
        this.userStatusClass = 'closed';
        break;

      default:
        this.userStatusMessage = '';
        this.userStatusClass = '';
        break;
    }
  }

  fetchDashboardData(userId: string) {
    const url = `https://localhost:7124/api/Users/${userId}/dashboard`;

    this.http.get(url).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = '❌ Failed to load dashboard data.';
        this.loading = false;
      },
    });
  }

  fetchWalletIdSilently(userId: string) {
    const url = `https://localhost:7124/api/Wallets/user/${userId}`;
    this.http.get<any[]>(url).subscribe({
      next: (wallets) => {
        if (wallets?.length > 0 && wallets[0].id) {
          sessionStorage.setItem('walletId', wallets[0].id);
        }
      },
    });
  }
}
