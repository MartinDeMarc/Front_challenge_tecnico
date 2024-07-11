import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4000/api/auth'

  constructor(private http: HttpClient) { }

  login(usuario: string, contraseña: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { usuario, contraseña });
  }

  registro(nombre: string, usuario: string, contraseña: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, { nombre, usuario, contraseña });
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuario');
  }


  setUsuario(usuario: string): void {
    localStorage.setItem('usuario', usuario);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }


  getUsuario(): string | null {
    return localStorage.getItem('usuario');
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario'); 
  }

  
  
 
  }

