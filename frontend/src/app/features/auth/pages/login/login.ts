import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  form: any;
  errorMessage: string = '';
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['khaled@gmail.com', [Validators.required, Validators.email]],
      password: ['khaled', Validators.required],
      isAdmin: [false],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = '⚠️ Please fill in all required fields.';
      return;
    }

    const { email, password, isAdmin } = this.form.value;
    this.errorMessage = '';
    this.loading = true;

    if (isAdmin && email === 'admin@admin.com' && password === 'admin') {
      sessionStorage.setItem('role', 'admin');
      this.router.navigate(['/admin/dashboard']);
      this.loading = false;
      return;
    }

    console.log('🚀 Sending login request...', this.form.value);
    this.http.post<any>('https://localhost:7124/api/auth/login', { email, password }).subscribe({
      next: (res) => {
        console.log('✅ Login success:', res);
        sessionStorage.setItem('token', res.accessToken);
        sessionStorage.setItem('userId', res.userId);
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('role', 'user');
        sessionStorage.setItem('fullName', res.fullName);
        sessionStorage.setItem('status', res.status);

        this.loading = false;
        this.router.navigate(['/user/dashboard']);
      },
      error: (err) => {
        console.error('❌ Login error:', err);
        this.errorMessage = '❌ Invalid credentials or server error.';
        this.loading = false;
      },
    });
  }
}
