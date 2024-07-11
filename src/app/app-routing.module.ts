import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component'
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { authGuard } from './auth/auth.guard';
import { guestGuard } from './auth/guest.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: 'login',
     component: LoginComponent, 
     canActivate: [guestGuard] 
      },

  { path: 'registro',
     component: RegistroComponent,
     canActivate: [guestGuard]  },
     { 
      path: 'productos',
      loadChildren: () => import('../../src/app/components/productos/productos.module').then(m => m.ProductosModule),
      canActivate: [authGuard]
    },
  { 
    path: 'crear-producto', 
    component: CrearProductoComponent, 
    canActivate: [authGuard]
  },
  { 
    path: 'editar-producto/:id', 
    component: CrearProductoComponent, 
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }