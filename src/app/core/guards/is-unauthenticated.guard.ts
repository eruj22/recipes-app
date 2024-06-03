import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

export const isUnauthenticatedGuard = () => {
  const authService = inject(AuthService);
  return authService.getActiveUser().pipe(map(user => !user));
};
