import { Routes } from '@angular/router';
import { UserLayoutComponent } from '../layout/user-layout/user-layout';
import { UserGuard } from '../../../guards/user.guard';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile').then((m) => m.Profile),
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./transactions/transactions').then((m) => m.TransactionsComponent),
      },
      {
        path: 'payment',
        loadComponent: () => import('./payment/payment').then((m) => m.PaymentComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings').then((m) => m.SettingsComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
