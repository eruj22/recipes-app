import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-overview/home-overview.page').then(
        (m) => m.HomeOverviewPageComponent
      ),
  },
];
