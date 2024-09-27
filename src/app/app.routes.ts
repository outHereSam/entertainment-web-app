import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/media-list/media-list.component').then(
        (m) => m.MediaListComponent
      ),
  },

  // Auth routes

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
    path: 'categories/:category',
    loadComponent: () =>
      import('./pages/media-list/media-list.component').then(
        (m) => m.MediaListComponent
      ),
  },
  {
    path: 'bookmarks',
    loadComponent: () =>
      import('./pages/bookmarks/bookmarks.component').then(
        (m) => m.BookmarksComponent
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
