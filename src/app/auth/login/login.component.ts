import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormGroup,  FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    
  }


  submit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe(
        response => {
          console.log('Respuesta completa del servidor:', response);
          Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
          this.authService.setUsuario(username);
          console.log('Intentando navegar a /productos');
          this.router.navigate(['/productos']).then(() => {
            console.log('Navegación completada');
          });
        },
        error => {
          console.error('Error en el login', error);
          this.error = 'Usuario o contraseña incorrectos';
          Swal.fire('Error', this.error, 'error');
        }
      );
    } else {
      this.error = 'Por favor, complete todos los campos';
    }
  }
}
