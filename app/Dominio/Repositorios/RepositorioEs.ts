/* eslint-disable @typescript-eslint/semi */
import { Es } from '../Datos/Entidades/Es';
import { Paginador } from '../Paginador';

export interface RepositorioEs {
  obtenerEss(param: any): Promise<{ess: Es[], paginacion: Paginador}>
  obtenerEs(id:number): Promise<Es>
  obtenerEsVigilado(id:string): Promise<{}>
  crearEs(es: Es): Promise<Es>
  actualizarEsAll(es:Es): Promise<Es>
  eliminarEs(id:number): Promise<{message: string}>
}
