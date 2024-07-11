import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('Usuario autenticado, redirigiendo a productos');
    router.navigate(['/productos']);
    return false;
  } else {
    console.log('Usuario no autenticado, permitiendo acceso');
    return true;
  }
};