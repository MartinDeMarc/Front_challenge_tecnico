import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = 'http://localhost:4000/api/productos/' 

  constructor( private http: HttpClient) { }

  getProductos(filtros: any = {}): Observable<any> {
    let params = new HttpParams();
    if (filtros.name) {
      params = params.set('name', filtros.name);
    }
    if (filtros.type) {
      params = params.set('type', filtros.type);
    }
    if (filtros.orderBy) {
      params = params.set('orderBy', filtros.orderBy);
    }
    if (filtros.orderDirection) {
      params = params.set('orderDirection', filtros.orderDirection);
    }
    console.log('Parámetros de filtro:', filtros);
    return this.http.get(this.url, { params });
  }


eliminarProducto(id: string): Observable<any>{
  return this.http.delete(`${this.url}/${id}`);
}

guardarProductoConImagen(formData: FormData): Observable<any> {
  return this.http.post(this.url, formData);

}
editarProductoConImagen(id: string, formData: FormData): Observable<any> {
  return this.http.put(`${this.url}/${id}`, formData);

}

guardarProducto(producto: Producto): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(this.url, producto, { headers });
}

obtenerProducto(id : string): Observable<any> {
  return this.http.get(`${this.url}/${id}`);
}


editarProducto(id: string, producto: Producto): Observable<any> {
  return this.http.put(`${this.url}/${id}`, producto);
}

}
