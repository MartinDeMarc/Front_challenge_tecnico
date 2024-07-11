import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrearProductoComponent{

  errorMessage: string = '';
  errorMessageNombre: string = '';
  errorMessageTipo: string = '';
  errorMessageIngredientes: string = '';


  productoForm: FormGroup = new FormGroup({}); 
  imagen: File | null = null;

  tipos: string[] = ['burger', 'condimentos', 'aperitivos', 'bebidas'];

  titulo: string = 'Crear Producto';

  id:string | null = null;
 

  constructor(private formBuilder: FormBuilder,
        private router: Router, 
      private _productoService: ProductoService, 
    private aRouter: ActivatedRoute) { }

  ngOnInit() {
    console.log('Valor inicial de this.titulo en ngOnInit:', this.titulo) 
    this.createForm();
    this.editarProducto();
  }
  createForm() {
    this.productoForm = this.formBuilder.group({
      'nombre': [null, Validators.required],
      'tipo': [null, Validators.required],
      'precio': [null, Validators.required],
      'ingredientes': [null, Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  



  guardarProducto() {
    if (this.productoForm.valid) {
      const producto: Producto = this.prepararProducto();
      const action = this.id !== null ? 
        this._productoService.editarProducto(this.id, producto) :
        this._productoService.guardarProducto(producto);
  
      action.subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error)
      });
    }
  }
  
  prepararProducto(): Producto {
    const ingredientesArray = this.productoForm.get('ingredientes')?.value.split(',').map((ingrediente: string) => ingrediente.trim());
    return {
      nombre: this.productoForm.get('nombre')?.value,
      tipo: this.productoForm.get('tipo')?.value,
      precio: this.productoForm.get('precio')?.value,
      ingredientes: ingredientesArray,
    };
  }
  
  handleSuccess() {
    Swal.fire({
      title: '¡Éxito!',
      text: 'Producto guardado con éxito',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/']);
      }
    });
  }
  
  handleError(error: any) {
    console.log(error);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un error al guardar el producto',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }

  updateErrorMessage() {

       if (this.productoForm.get('nombre')?.hasError('required')) {
          this.errorMessageNombre = 'Debe introducir un valor para el nombre';
        } else {
          this.errorMessageNombre = ''; 
        }

        if (this.productoForm.get('tipo')?.hasError('required')) {
          this.errorMessageTipo = 'Debe introducir un valor para el tipo';
        } else {
          this.errorMessageTipo = ''; 
        }

    if (this.productoForm.get('precio')?.hasError('required')) {
      this.errorMessage = 'Debe introducir un valor para el precio';
    } else {
      this.errorMessage = ''; 
    }

    if (this.productoForm.get('ingredientes')?.hasError('required')) {
      this.errorMessageIngredientes = 'Debe introducir un valor para los ingredientes';
    } else {
      this.errorMessageIngredientes = ''; 
    }
  }

  editarProducto() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      console.log('this.titulo después de editarProducto():', this.titulo);
      this._productoService.obtenerProducto(this.id).subscribe({
        next: (data: any) => {
          this.productoForm.setValue({
            nombre: data.nombre,
            tipo: data.tipo,
            precio: data.precio,
            ingredientes: data.ingredientes.join(', ')
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
  

}
