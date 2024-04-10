import { Paginador } from '../../Paginador';
import { RepositorioPc } from 'App/Dominio/Repositorios/RepositorioPc';
import { Pc } from '../Entidades/Pc';

export class ServicioPc{
  constructor (private repositorio: RepositorioPc) { }

  async obtenerPcs(param: any): Promise<{pcs: Pc[], paginacion: Paginador}>{
    return this.repositorio.obtenerPcs(param)
  }
  async obtenerPc(id:number): Promise<Pc>{
    return this.repositorio.obtenerPc(id)
  }
  async crearPc(pc: Pc): Promise<Pc>{
    return this.repositorio.crearPc(pc)
  }
  async actualizarPcAll(pc:Pc): Promise<Pc>{
    return this.repositorio.actualizarPcAll(pc)
  }
  async eliminarPc(id:number): Promise<{message: string}>{
    return this.repositorio.eliminarPc(id)
  }

}
