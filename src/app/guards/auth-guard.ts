import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async () => {

  const serv = inject(Auth);
  const route = inject(Router);

  const { data } = await serv.getUser();

  if (data.user) {
    return true;

  }

  route.navigate(['/login']); 
  return false;

};
