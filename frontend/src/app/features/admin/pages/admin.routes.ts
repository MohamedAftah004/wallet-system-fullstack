import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard';
import { UsersComponent } from './users/users';
import { ReportsComponent } from './reports/reports';
import { TransactionsComponent } from './transactions/transactions';
import { SettingsComponent } from './settings/settings';
import { AdminGuard } from '../../../guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AdminGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AdminGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
