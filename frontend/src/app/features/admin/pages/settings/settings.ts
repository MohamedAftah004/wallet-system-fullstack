import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SidebarComponent } from '../../layout/sidebar/sidebar';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsComponent implements OnInit {
  profileForm: any;
  securityForm: any;
  darkMode = false;
  notifications = true;
  message = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      fullName: ['Mohamed Admin', Validators.required],
      email: ['admin@wallet.com', [Validators.required, Validators.email]],
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.minLength(6)]],
    });
  }

  saveProfile() {
    this.message = '✅ Profile updated successfully!';
    setTimeout(() => (this.message = ''), 2500);
  }

  saveSecurity() {
    this.message = '🔒 Password updated successfully!';
    setTimeout(() => (this.message = ''), 2500);
  }

  savePreferences() {
    this.message = '⚙️ Preferences saved!';
    setTimeout(() => (this.message = ''), 2500);
  }
}
