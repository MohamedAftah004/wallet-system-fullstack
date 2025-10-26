import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserNavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserNavbarComponent],
  templateUrl: './user-layout.html',
  styleUrls: ['./user-layout.scss'],
})
export class UserLayoutComponent {}
