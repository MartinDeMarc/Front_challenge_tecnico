

export class Producto {
    id?: number;
    nombre: string;
    tipo: string;
    precio: number;
    ingredientes: string[];



    constructor(nombre:string, descripcion:string, precio:number, ingredientes:string[]){
    
            this.nombre = nombre;
            this.tipo = descripcion;
            this.precio = precio;
            this.ingredientes = ingredientes;

          
    
    }
}
