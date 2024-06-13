import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const loginGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return router.navigate(['']);
      }
      
      return true;
    })
  );
};
