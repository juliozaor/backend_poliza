/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioPoliza } from 'App/Dominio/Repositorios/RepositorioPoliza'

export class ServicioPoliza{
  constructor (private repositorio: RepositorioPoliza) { }

  async visualizar (modalidadId:number, vigiladoId:string): Promise<any>{
    return this.repositorio.visualizar(modalidadId, vigiladoId)
  }

  async guardar (datos:any, vigiladoId: string): Promise<any>{
    return this.repositorio.guardar(datos, vigiladoId)
  }

  async capacidad (datos:any, vigiladoId: string): Promise<any>{
    return this.repositorio.capacidad(datos, vigiladoId)
  }

  async obtenerVehiculos (params: any, id:string): Promise<any>{
    return this.repositorio.obtenerVehiculos(params, id)
  }

}
