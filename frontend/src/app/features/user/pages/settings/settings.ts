import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsComponent implements OnInit {
  user = {
    fullName: 'Mohamed Ali',
    email: 'mohamed@example.com',
    phone: '+201001234567',
  };

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  darkMode = false;
  message = '';

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    this.darkMode = theme === 'dark';
  }

  saveProfile() {
    this.message = '✅ Profile updated successfully!';
    setTimeout(() => (this.message = ''), 3000);
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.message = '⚠️ Passwords do not match!';
      return;
    }

    this.message = '🔒 Password changed successfully!';
    setTimeout(() => (this.message = ''), 3000);

    this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    const theme = this.darkMode ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
