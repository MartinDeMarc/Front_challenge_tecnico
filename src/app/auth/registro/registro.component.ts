import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  usuarioForm: FormGroup;
  errorMessage: string = '';
  errorMessageNombre: string = '';
  errorMessageUsuario: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.usuarioForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      usuario: [null, Validators.required],
      contraseña: [null, Validators.required],
    });
  }

  ngOnInit() {}

  guardarUsuario() {
    if (this.usuarioForm.valid) {
      const { nombre, usuario, contraseña } = this.usuarioForm.value;
      this.authService.registro(nombre, usuario, contraseña).subscribe(
        response => {
          console.log('Registro exitoso', response);
          Swal.fire({
            title: '¡Éxito!',
            text: 'Usuario creado con éxito',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        },
        error => {
          console.error('Error en el registro', error);
          Swal.fire('Error', 'No se pudo crear el usuario', 'error');
        }
      );
    } else {
      this.updateErrorMessage();
    }
  }

updateErrorMessage() {


 if (this.usuarioForm.get('nombre')?.hasError('required')) {
    this.errorMessageNombre = 'Debe introducir un valor para el nombre';
  } else {
    this.errorMessageNombre = ''; 
  }

  if (this.usuarioForm.get('usuario')?.hasError('required')) {
    this.errorMessageUsuario = 'Debe introducir un valor para el usuario';
  } else {
    this.errorMessageUsuario = ''; 
  }

if (this.usuarioForm.get('contraseña')?.hasError('required')) {
this.errorMessage = 'Debe introducir un valor para la contraseña';
} else {
this.errorMessage = ''; 
}
}


}
