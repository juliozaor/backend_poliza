import { Paginador } from '../../../Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioEs } from 'App/Dominio/Repositorios/RepositorioEs'
import { Es } from 'App/Dominio/Datos/Entidades/Es';
import TblEss from 'App/Infraestructura/Datos/Entidad/Es';

export class RepositorioEsDB implements RepositorioEs {

  async obtenerEss(param: any): Promise<{ess: Es[], paginacion: Paginador}> {
    const ess: Es[] = [];
    const { pagina, limite } = param;

    const sql = TblEss.query();
    const essDB = await sql.orderBy("id", "asc").paginate(pagina, limite);

    essDB.forEach((essDB) => {
      ess.push(essDB.obtenerEs());
    });
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(essDB);
    return { ess, paginacion };
  }

  async obtenerEs(id:number): Promise<Es> {
    try {
      const es = await TblEss.findOrFail(id);
      return es.obtenerEs();      
    } catch (error) {
      throw new Error("Transporte especia no encontrada");
      
    }
  }


  async crearEs(Es: Es): Promise<Es> {
    try{
    let esDB = new TblEss();
    esDB.establecerEsDb(Es);
    await esDB.save();
    return esDB;
  } catch (error) {
    throw new Error("error al guardar: " + error);
  }
  }

  async actualizarEsAll(Es:Es): Promise<Es> {
    try {
      let esDB = await TblEss.findOrFail(Es.id);
      esDB.estableceEsConId(Es);
      await esDB.save();
      return esDB;
      
    } catch (error) {
      throw new Error("Transporte especia no esncontrada");
    }
  }

  async eliminarEs(id:number): Promise<{message: string}> {
    try {
      let esDB = await TblEss.findOrFail(id);
      await esDB.delete();
      return {message:'Transporte especia eliminada correctamente'};
      
    } catch (error) {
      throw new Error("Transporte especia no encontrada");
    }
  }


}
