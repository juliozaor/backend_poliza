export interface RepositorioPoliza {
  visualizar(modalidadId:number, vigiladoId: string): Promise<any>
  guardar(datos:any, vigiladoId: string): Promise<any>
  capacidad(datos:any, vigiladoId: string): Promise<any>
  obtenerVehiculos(params: any, id:string): Promise<any>
}
