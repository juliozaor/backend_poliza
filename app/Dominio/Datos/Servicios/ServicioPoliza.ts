/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioPoliza } from 'App/Dominio/Repositorios/RepositorioPoliza'

export class ServicioPoliza{
  constructor (private repositorio: RepositorioPoliza) { }

  async visualizar (datos:any, vigiladoId:string): Promise<any>{
    return this.repositorio.visualizar(datos, vigiladoId)
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

  async listarPolizas (datos:any, vigiladoId: string): Promise<any>{
    return this.repositorio.listarPolizas(datos, vigiladoId)
  }

  async listarVehiculos (datos:any, vigiladoId: string): Promise<any>{
    return this.repositorio.listarVehiculos(datos, vigiladoId)
  }

  async eliminarVehiculos (datos:any, vigiladoId: string): Promise<any>{
    return this.repositorio.eliminarVehiculos(datos, vigiladoId)
  }

  async agregarVehiculos (datos:any, vigiladoId: string): Promise<any>{
    return this.repositorio.agregarVehiculos(datos, vigiladoId)
  }

}
