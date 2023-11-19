import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.role === 'ADMIN_ROLE') {
    return true;
  } else {
    router.navigateByUrl('/dashboard');
    return false;
  }
};
