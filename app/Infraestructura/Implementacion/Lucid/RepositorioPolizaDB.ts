
import { RepositorioPoliza } from "App/Dominio/Repositorios/RepositorioPoliza";
/* import TblTiposPolizas from "App/Infraestructura/Datos/Entidad/TiposPoliza"; */
import TblPolizas from "App/Infraestructura/Datos/Entidad/poliza";
import TblDetallesPolizaCoberturas from "App/Infraestructura/Datos/Entidad/DetallespolizaCobertura";
import { Responsabilidad } from "App/Dominio/Datos/Entidades/responsabilidad";
import TblResponsabilidades from "App/Infraestructura/Datos/Entidad/responsabilidades";
import { Archivo } from "App/Dominio/Datos/Entidades/archivo";
import TblArchivo from "App/Infraestructura/Datos/Entidad/Archivos";
import TblCapacidades from "App/Infraestructura/Datos/Entidad/Capacidades";

export class RepositorioPolizaDB implements RepositorioPoliza {
  async visualizar(modalidadId: number, vigiladoId: string): Promise<any> {
   /*  let editable = true;

const polizaIds = new Array()     

    const polizaContractual = await TblPolizas.query().preload('responsabilidad')
      .where("pol_modalidad_id", modalidadId)
      .where("pol_vigilado_id", vigiladoId)
      .where("pol_tipo_poliza_id", 1)
      .where("pol_fin_vigencia", ">=", new Date())
      .orderBy("pol_fin_vigencia", "desc")  
      .first()

      
      

      if(polizaContractual){
        polizaIds.push(polizaContractual.id)
      }

      const polizaExtra = await TblPolizas.query().preload('responsabilidad')
      .where("pol_modalidad_id", modalidadId)
      .where("pol_vigilado_id", vigiladoId)
      .where("pol_tipo_poliza_id", 2)
      .where("pol_fin_vigencia", ">=", new Date())
      .orderBy("pol_fin_vigencia", "desc")  
      .first()

      if(polizaExtra){
        polizaIds.push(polizaExtra.id)
      }


    const consulta = TblTiposPolizas.query().preload(
      "coberturas",
      async (sqlCob) => {
        sqlCob.preload("tiposAmparo");
        sqlCob.orderBy("orden", "asc");
        if (polizaIds.length > 0) {
          sqlCob.preload("detalles", (sqlDetalle) => {
            sqlDetalle.whereIn("dpl_poliza_id", polizaIds);
          });
          editable = false;          
        }
      }
    );

    let tiposPoliza = await consulta;

    const coberturasPorTipoAmparoYPoliza = tiposPoliza.reduce(
      (acumulador, poliza) => {
        poliza.coberturas.forEach((cobertura) => {
          const tipoAmparo = cobertura.tiposAmparo.nombre;
          const tipoPoliza = poliza.descripcion;

          // Si el tipo de amparo aún no existe en el objeto, inicializarlo como un objeto vacío
          if (!acumulador[tipoPoliza]) {
            acumulador[tipoPoliza] = {};
          }

          // Si el tipo de póliza aún no existe en el objeto de amparo, inicializarlo como un array vacío
          if (!acumulador[tipoPoliza][tipoAmparo]) {
            acumulador[tipoPoliza][tipoAmparo] = [];
          }

          // Agregar la cobertura al array correspondiente al tipo de amparo y tipo de póliza
          acumulador[tipoPoliza][tipoAmparo].push(cobertura);
        });

        return acumulador;
      },
      {}
    );

    
    if(polizaContractual){
      coberturasPorTipoAmparoYPoliza["polizaContractual"] = polizaContractual;
    }
    
    if(polizaExtra){
      coberturasPorTipoAmparoYPoliza["polizaExtracontractual"] = polizaExtra;
    }
    
    
    coberturasPorTipoAmparoYPoliza["editable"] = editable;
    return coberturasPorTipoAmparoYPoliza; */
  }

  async guardar(datos: any, vigiladoId: string): Promise<any> {
    const {
      polizaContractual,
      polizaExtracontractual,      
    } = datos;

    
    try {
      await this.guardarPoliza(polizaContractual, vigiladoId,1);
      await this.guardarPoliza(polizaExtracontractual, vigiladoId,2);
      return {
        mensaje: "Polizas guardada correctamente",
      };
    } catch (error) {
      console.log(error);
      
    }
  }

  guardarPoliza = async (
    poliza: any,
    vigiladoId: string,
    tipoPoliza:number
  ) => {

   // let polizaId

    const polizaDBExiste = await TblPolizas.findBy('pol_numero', poliza.numero);
        
    if (polizaDBExiste) {
      polizaDBExiste.establecePolizaConId(poliza);
      await polizaDBExiste.save();
      //polizaId = polizaDBExiste.id;
    }else{
      const polizaDB = new TblPolizas();
      polizaDB.establecerPolizaDb(poliza);
      polizaDB.vigiladoId = vigiladoId;
      polizaDB.tipoPolizaId = tipoPoliza;
      await polizaDB.save();
    }
    const amparosIn = new Array();
    poliza.amparos.forEach((amparo) => {
      amparo.poliza = poliza.numero;
      amparosIn.push(amparo);
    });
    
    if(poliza.responsabilidad){
      await this.guardarResponsabilidad(poliza.responsabilidad, poliza.numero);
    }

    if(poliza.caratula){
      await this.guardarArchivo(poliza.caratula, poliza.numero);
    }


    try {
      await TblDetallesPolizaCoberturas.updateOrCreateMany(['coberturaId','poliza'],amparosIn);
      return {
        mensaje: "Poliza guardada correctamente",
      };
    } catch (error) {
      console.log(error);
      
    }


  };




  guardarResponsabilidad = async (
    responsabilidad: Responsabilidad,
    poliza: number
  ) => {
    try {
      const respondabilidadBDExiste = await TblResponsabilidades.findBy(
        "res_poliza",
        poliza
      );
      if (respondabilidadBDExiste) {
        respondabilidadBDExiste.estableceResponsabilidadConId(responsabilidad);
        await respondabilidadBDExiste.save();
        return respondabilidadBDExiste;
      } else {
        const responsabilidadBD = new TblResponsabilidades();
        responsabilidadBD.establecerResponsabilidadDb(responsabilidad);
        responsabilidadBD.poliza = poliza;
        await responsabilidadBD.save();
        return responsabilidadBD;
      }
    } catch (error) {
      console.log(error);
    }
  };

  guardarArchivo = async (
    archivo: Archivo,
    poliza: number
  ) => {
    try {
      const archivoBDExiste = await TblArchivo.findBy(
        "arc_poliza",
        poliza
      );
      if (archivoBDExiste) {
        archivoBDExiste.estableceArchivoConId(archivo);
        await archivoBDExiste.save();
        return archivoBDExiste;
      } else {
        const archivoBD = new TblArchivo();
        archivoBD.establecerArchivoDb(archivo);
        archivoBD.poliza = poliza;
        await archivoBD.save();
        return archivoBD;
      }
    } catch (error) {
      console.log(error);
    }
  };

  async capacidad(datos: any, vigiladoId: string): Promise<any> {  
    const { capacidades }= datos 
    capacidades.map(capacidad =>{
      capacidad.vigiladoId = vigiladoId
      return capacidad
    })    
    
    try {
      await TblCapacidades.updateOrCreateMany(['modalidadId','numero'],capacidades);
      return {
        mensaje: "Modalidades guardadas correctamente",
      };
    } catch (error) {
      console.log(error);
      
    }
  }

}
