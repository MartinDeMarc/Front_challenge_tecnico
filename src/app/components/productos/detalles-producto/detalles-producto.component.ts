import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent {

  imageLoaded: boolean = false; 


  objectKeys = Object.keys;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Datos del producto:', this.data);
  }
}