import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface RegisterResponse {
  id?: string;
  userId?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

interface WalletResponse {
  id: string;
  userId: string;
  currencyCode: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent implements OnInit {
  step = 1;
  registerForm!: FormGroup;
  walletForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  loading = false;
  createdUserId: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.walletForm = this.fb.group({
      currencyCode: ['', [Validators.required]],
    });
  }

  onRegisterSubmit() {
    this.errorMessage = '';
    const { fullName, email, phoneNumber, password, confirmPassword } = this.registerForm.value;

    if (this.registerForm.invalid) {
      this.errorMessage = '⚠️ Please fill in all fields correctly.';
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage = '❌ Passwords do not match.';
      return;
    }

    this.loading = true;
    const payload = { fullName, email, phoneNumber, password };

    this.http;
    this.http.post<any>('https://localhost:7124/api/Users/register', payload).subscribe({
      next: (res) => {
        console.log('✅ User registered:', res);
        this.createdUserId = res.userId || res.id || null;
        this.loading = false;

        if (!this.createdUserId) {
          this.errorMessage = '⚠️ User ID not returned from API.';
          return;
        }

        this.successMessage = '✅ Account created successfully! Continue to wallet setup.';
        setTimeout(() => {
          this.step = 2;
          this.successMessage = '';
        }, 1000);
      },
      error: (err) => {
        console.error('❌ Registration failed:', err);
        this.loading = false;
        if (err.status === 409) this.errorMessage = '⚠️ Email or phone number already exists.';
        else if (err.status === 404)
          this.errorMessage = '⚠️ API endpoint not found. Check backend.';
        else this.errorMessage = '❌ Something went wrong. Please try again.';
      },
    });
  }

  onWalletSubmit() {
    this.errorMessage = '';
    const { currencyCode } = this.walletForm.value;

    if (!currencyCode || !this.createdUserId) {
      this.errorMessage = '⚠️ Please select a currency.';
      return;
    }

    this.loading = true;
    const payload = { userId: this.createdUserId, currencyCode };

    https: this.http
      .post<WalletResponse>('https://localhost:7124/api/Wallets/create', payload)
      .subscribe({
        next: (res) => {
          console.log('✅ Wallet created:', res);
          this.loading = false;
          this.successMessage = '✅ Wallet created successfully! Redirecting...';

          sessionStorage.setItem('userId', this.createdUserId!);
          sessionStorage.setItem('walletId', res.id);
          sessionStorage.setItem('currencyCode', res.currencyCode);

          setTimeout(() => this.router.navigate(['/dashboard']), 1500);
        },
        error: (err) => {
          console.error('❌ Wallet creation failed:', err);
          this.loading = false;
          this.errorMessage = '⚠️ Failed to create wallet. Please try again.';
        },
      });
  }
}
