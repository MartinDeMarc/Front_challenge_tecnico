import { NgModule,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';


import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';



import { SharedModule } from '../../shared/shared.module';


import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';


import { ProductoService } from '../../services/producto.service'



const productosRoutes: Routes = [
    { path: '', component: ListarProductosComponent },
    { path: 'crear', component: CrearProductoComponent },
    { path: 'editar/:id', component: CrearProductoComponent },
    { path: ':id', component: DetallesProductoComponent }
  ];

@NgModule({
  declarations: [
    ListarProductosComponent,
    CrearProductoComponent,
    DetallesProductoComponent, 
    

  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(productosRoutes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    SharedModule, 
    MatIconModule, 
  ],
  exports: [
    ListarProductosComponent,
    CrearProductoComponent,
    DetallesProductoComponent
  ],
  providers: [
    ProductoService
  ]
})
export class ProductosModule { }