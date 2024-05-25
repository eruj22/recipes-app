import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/countries-overview/countries-overview.component').then(
        (m) => m.CountriesOverviewComponent
      ),
  },
];
