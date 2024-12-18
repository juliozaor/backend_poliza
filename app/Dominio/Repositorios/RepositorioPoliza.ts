export interface RepositorioPoliza {
  visualizar(datos:any, vigiladoId: string): Promise<any>
  guardar(datos:any, vigiladoId: string): Promise<any>
  capacidad(datos:any, vigiladoId: string): Promise<any>
  obtenerVehiculos(params: any, id:string): Promise<any>


  listarPolizas(datos:any, vigiladoId: string): Promise<any>
  //listarPolizasPublica(datos:any): Promise<any>
  listarVehiculos(datos:any, vigiladoId: string): Promise<any>
  eliminarVehiculos(datos:any, vigiladoId: string): Promise<any>
  agregarVehiculos(datos:any, vigiladoId: string): Promise<any>
  interoperabilidad(datos:any, nit: string, id: string): Promise<any>
  novedadesPoliza(datos:any): Promise<any>
  novedadesPolizapeccit(datos:any): Promise<any>
  listarAmparo(datos:any)
  consultarResponsabilidad(datos:any)
  gestionarPlaca(placa:string, vigiladoId: string): Promise<any>
  desvincularPlaca(id:number, motivo: string): Promise<any>
  buscarPorVigiladoId(usn_identificacion: string): Promise<any>;
  listarPolizasporNumero(
    usn_identificacion: string,
    pol_numero?: string,
    page?: number,
    limit?: number
  ): Promise<any>;
  actualizarPoliza(datos: any): Promise<any>;


}


