/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioPoliza } from 'App/Dominio/Repositorios/RepositorioPoliza'

export class ServicioPoliza{
  constructor (private repositorio: RepositorioPoliza) { }

  async visualizar (): Promise<any>{
    return this.repositorio.visualizar()
  }


}
