import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },

  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then(m => m.AuthPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/auth/sign-up/sign-up.page').then(m => m.SignUpPage)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then(m => m.MainPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/main/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/main/profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];