import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@home/home.routes').then(m => m.routes),
  },
  {
    path: 'login',
    loadChildren: () => import('@login/login.routes').then(m => m.routes),
  },
  {
    path: 'register',
    loadChildren: () => import('@register/register.routes').then(m => m.routes),
  },
];
