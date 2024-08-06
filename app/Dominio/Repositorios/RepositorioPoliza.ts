export interface RepositorioPoliza {
  visualizar(datos:any, vigiladoId: string): Promise<any>
  guardar(datos:any, vigiladoId: string): Promise<any>
  capacidad(datos:any, vigiladoId: string): Promise<any>
  obtenerVehiculos(params: any, id:string): Promise<any>

  listarPolizas(datos:any, vigiladoId: string): Promise<any>
  listarVehiculos(datos:any, vigiladoId: string): Promise<any>
  eliminarVehiculos(datos:any, vigiladoId: string): Promise<any>
  agregarVehiculos(datos:any, vigiladoId: string): Promise<any>


}


