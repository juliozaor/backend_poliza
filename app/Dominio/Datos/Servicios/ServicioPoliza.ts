/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioPoliza } from 'App/Dominio/Repositorios/RepositorioPoliza'

export class ServicioPoliza{
  constructor (private repositorio: RepositorioPoliza) { }

  async visualizar (modalidadId:number, polizaId:number, aseguradoraId: number): Promise<any>{
    return this.repositorio.visualizar(modalidadId, polizaId, aseguradoraId)
  }


}
