/* eslint-disable @typescript-eslint/semi */
import { Pc } from '../Datos/Entidades/Pc';
import { Paginador } from '../Paginador';

export interface RepositorioPc {
  obtenerPcs(param: any): Promise<{pcs: Pc[], paginacion: Paginador}>
  obtenerPc(id:number): Promise<Pc>
  obtenerPcVigilado(id:string): Promise<{}>
  crearPc(pc: Pc): Promise<Pc>
  actualizarPcAll(pc:Pc): Promise<Pc>
  eliminarPc(id:number): Promise<{message: string}>
}
