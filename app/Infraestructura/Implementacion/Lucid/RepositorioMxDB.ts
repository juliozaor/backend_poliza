import { Paginador } from '../../../Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioMx } from 'App/Dominio/Repositorios/RepositorioMx'
import { Mx } from 'App/Dominio/Datos/Entidades/Mx';
import TblMxs from 'App/Infraestructura/Datos/Entidad/Mx';

export class RepositorioMxDB implements RepositorioMx {

  async obtenerMxs(param: any): Promise<{mxs: Mx[], paginacion: Paginador}> {
    const mxs: Mx[] = [];
    const { pagina, limite } = param;

    const sql = TblMxs.query();
    const mxsDB = await sql.orderBy("id", "asc").paginate(pagina, limite);

    mxsDB.forEach((mxsDB) => {
      mxs.push(mxsDB.obtenerMx());
    });
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(mxsDB);
    return { mxs, paginacion };
  }

  async obtenerMx(id:number): Promise<Mx> {
    try {
      const mx = await TblMxs.findOrFail(id);
      return mx.obtenerMx();      
    } catch (error) {
      throw new Error("Empresa de transporte mixto no encontrada");
      
    }
  }


  async crearMx(Mx: Mx): Promise<Mx> {
    try{
    let mxDB = new TblMxs();
    mxDB.establecerMxDb(Mx);
    await mxDB.save();
    return mxDB;
  } catch (error) {
    throw new Error("error al guardar: " + error);
  }
  }

  async actualizarMxAll(Mx:Mx): Promise<Mx> {
    try {
      let mxDB = await TblMxs.findOrFail(Mx.id);
      mxDB.estableceMxConId(Mx);
      await mxDB.save();
      return mxDB;
      
    } catch (error) {
      throw new Error("Empresa de transporte mixto no esncontrada");
    }
  }

  async eliminarMx(id:number): Promise<{message: string}> {
    try {
      let mxDB = await TblMxs.findOrFail(id);
      await mxDB.delete();
      return {message:'Empresa de transporte mixto eliminada correctamente'};
      
    } catch (error) {
      throw new Error("Empresa de transporte mixto no encontrada");
    }
  }


}
