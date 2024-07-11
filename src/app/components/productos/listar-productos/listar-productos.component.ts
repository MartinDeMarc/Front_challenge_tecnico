import { Component, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { DetallesProductoComponent } from '../detalles-producto/detalles-producto.component';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  productos: any[] = [];
  displayedColumns: string[] = ['position', 'nombre', 'tipo', 'precio', 'editar', 'eliminar', 'detalles'];
  filtroNombre: string = '';
  filtroTipo: string = '';
  orderBy: string = 'nombre'; 
  orderDirection: string = 'asc'; 

  constructor(
    private _productoService: ProductoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    const filtros: any = {
      name: this.filtroNombre,
      type: this.filtroTipo,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection
    };

    this._productoService.getProductos(filtros).subscribe({
      next: (response: any) => {
        this.productos = response;
        console.log(this.productos);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  eliminarProducto(id: string) {
   
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this._productoService.eliminarProducto(id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );
            this.obtenerProductos(); 
          },
          error: (error) => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire(
              'Error!',
              'No se pudo eliminar el producto.',
              'error'
            );
          }
        });
      }
    });
  }


  openDialog(element: any): void {
    const dialogRef = this.dialog.open(DetallesProductoComponent, {
      width: '400px',
      data: element
    });

    

    dialogRef.afterClosed().subscribe(() => {
      console.log('El diálogo fue cerrado');
    });
  }

  aplicarFiltros() {
    this.obtenerProductos();
  }

  ordenarProductos(columna: string) {
    if (this.orderBy === columna) {
     
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
 
      this.orderBy = columna;
      this.orderDirection = 'asc';
    }

   
    this.obtenerProductos();
  }

}
