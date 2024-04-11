import { Paginador } from '../../Paginador';
import { RepositorioEs } from 'App/Dominio/Repositorios/RepositorioEs';
import { Es } from '../Entidades/Es';

export class ServicioEs{
  constructor (private repositorio: RepositorioEs) { }

  async obtenerEss(param: any): Promise<{ess: Es[], paginacion: Paginador}>{
    return this.repositorio.obtenerEss(param)
  }
  async obtenerEs(id:number): Promise<Es>{
    return this.repositorio.obtenerEs(id)
  }

  async obtenerEsVigilado(id:string): Promise<Es>{
    return this.repositorio.obtenerEsVigilado(id)
  }

  async crearEs(es: Es): Promise<Es>{
    return this.repositorio.crearEs(es)
  }
  async actualizarEsAll(es:Es): Promise<Es>{
    return this.repositorio.actualizarEsAll(es)
  }
  async eliminarEs(id:number): Promise<{message: string}>{
    return this.repositorio.eliminarEs(id)
  }

}
