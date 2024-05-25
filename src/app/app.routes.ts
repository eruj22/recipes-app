import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@home/home.routes').then((m) => m.routes),
  },
];
