import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile implements OnInit {
  userData: any = null;
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      this.errorMessage = '⚠️ User not found. Please login again.';
      this.loading = false;
      return;
    }

    this.getUserData(userId);
  }

  getUserData(userId: string) {
    this.http.get(`https://localhost:7124/api/Users/${userId}`).subscribe({
      next: (res) => {
        this.userData = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
        this.errorMessage = 'Failed to load profile data.';
        this.loading = false;
      },
    });
  }

  goToTransactions() {
    this.router.navigate(['/user/transactions']);
  }

  goToPayments() {
    this.router.navigate(['/user/payment']);
  }
}
