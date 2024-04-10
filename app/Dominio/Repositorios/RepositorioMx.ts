/* eslint-disable @typescript-eslint/semi */
import { Mx } from '../Datos/Entidades/Mx';
import { Paginador } from '../Paginador';

export interface RepositorioMx {
  obtenerMxs(param: any): Promise<{mxs: Mx[], paginacion: Paginador}>
  obtenerMx(id:number): Promise<Mx>
  crearMx(mx: Mx): Promise<Mx>
  actualizarMxAll(mx:Mx): Promise<Mx>
  eliminarMx(id:number): Promise<{message: string}>
}
