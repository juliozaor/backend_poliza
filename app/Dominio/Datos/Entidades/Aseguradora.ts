export class Aseguradora {
  id: number  
  nit: number
  nombre: string
  direccion: string
  telefono: number
  estado: boolean

  constructor(data: { id: number; nit: number; nombre: string; direccion: string; telefono: number; estado: boolean }) {
    this.id = data.id;
    this.nit = data.nit;
    this.nombre = data.nombre;
    this.direccion = data.direccion;
    this.telefono = data.telefono;
    this.estado = data.estado;
  }

}
