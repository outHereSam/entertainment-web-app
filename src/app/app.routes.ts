import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/media-list/media-list.component').then(
        (m) => m.MediaListComponent
      ),
  },
  {
    path: ':category',
    loadComponent: () =>
      import('./pages/media-list/media-list.component').then(
        (m) => m.MediaListComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/media-list/media-list.component').then(
        (m) => m.MediaListComponent
      ),
  },
];
