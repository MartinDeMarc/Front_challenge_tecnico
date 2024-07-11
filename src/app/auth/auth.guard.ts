// src/app/auth/auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    if (authService.isAuthenticated()) {
      console.log('Usuario autenticado, permitiendo acceso');
      return true;
    } else {
      console.log('Usuario no autenticado, redirigiendo a login');
      router.navigate(['/login']);
      return false;
    }
  };