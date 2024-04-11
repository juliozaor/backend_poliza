import { Paginador } from '../../../Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioPc } from 'App/Dominio/Repositorios/RepositorioPc'
import { Pc } from 'App/Dominio/Datos/Entidades/Pc';
import TblPcs from 'App/Infraestructura/Datos/Entidad/Pc';

export class RepositorioPcDB implements RepositorioPc {

  async obtenerPcs(param: any): Promise<{pcs: Pc[], paginacion: Paginador}> {
    const pcs: Pc[] = [];
    const { pagina, limite } = param;

    const sql = TblPcs.query();
    const pcsDB = await sql.orderBy("id", "asc").paginate(pagina, limite);

    pcsDB.forEach((pcsDB) => {
      pcs.push(pcsDB.obtenerPc());
    });
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(pcsDB);
    return { pcs, paginacion };
  }

  async obtenerPc(id:number): Promise<Pc> {
    try {
      const pc = await TblPcs.findOrFail(id);
      return pc.obtenerPc();      
    } catch (error) {
      throw new Error("Pasajeros por carretera no encontrada");
      
    }
  }

  async obtenerPcVigilado(id:string): Promise<{}> {
      const pc = await TblPcs.findBy('pac_vigilado_id',id);
      if(pc){
        return pc.obtenerPc();
      }else{
        return {}
      }

  }


  async crearPc(pc: Pc): Promise<Pc> {    
   console.log(pc);
   
    try{
    let pcDB = new TblPcs();
    pcDB.establecerPcDb(pc);
    await pcDB.save();
    return pcDB;
  } catch (error) {
    console.log(error);
    
    throw new Error("error al guardar: " + error);
  }
  }

  async actualizarPcAll(Pc:Pc): Promise<Pc> {
    try {
      let pcDB = await TblPcs.findOrFail(Pc.id);
      pcDB.establecePcConId(Pc);
      await pcDB.save();
      return pcDB;
      
    } catch (error) {
      throw new Error("Pasajeros por carretera no esncontrada");
    }
  }

  async eliminarPc(id:number): Promise<{message: string}> {
    try {
      let pcDB = await TblPcs.findOrFail(id);
      await pcDB.delete();
      return {message:'Pasajeros por carretera eliminada correctamente'};
      
    } catch (error) {
      throw new Error("Pasajeros por carretera no encontrada");
    }
  }


}
