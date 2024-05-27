import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/register/register.page').then(
        (m) => m.RegisterPageComponent
      ),
  },
];
