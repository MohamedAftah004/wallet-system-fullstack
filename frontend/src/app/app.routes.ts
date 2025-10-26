import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/pages/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/pages/user.routes').then((m) => m.userRoutes),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
