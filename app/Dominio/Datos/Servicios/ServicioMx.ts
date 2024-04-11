import { Paginador } from '../../Paginador';
import { RepositorioMx } from 'App/Dominio/Repositorios/RepositorioMx';
import { Mx } from '../Entidades/Mx';

export class ServicioMx{
  constructor (private repositorio: RepositorioMx) { }

  async obtenerMxs(param: any): Promise<{mxs: Mx[], paginacion: Paginador}>{
    return this.repositorio.obtenerMxs(param)
  }
  async obtenerMx(id:number): Promise<Mx>{
    return this.repositorio.obtenerMx(id)
  }
  async obtenerMxVigilado(id:string): Promise<{}>{
    return this.repositorio.obtenerMxVigilado(id)
  }
  async crearMx(mx: Mx): Promise<Mx>{
    return this.repositorio.crearMx(mx)
  }
  async actualizarMxAll(mx:Mx): Promise<Mx>{
    return this.repositorio.actualizarMxAll(mx)
  }
  async eliminarMx(id:number): Promise<{message: string}>{
    return this.repositorio.eliminarMx(id)
  }

}
