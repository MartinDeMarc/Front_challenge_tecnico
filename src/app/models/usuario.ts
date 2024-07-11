export class Usuario {
    id?: number;
    nombre: string;
    usuario: string;
    contraseña: string;



    constructor(nombre:string, usuario:string, contraseña:string){
    
            this.nombre = nombre;
            this.usuario = usuario;
            this.contraseña = contraseña;
          
    
    }
}
