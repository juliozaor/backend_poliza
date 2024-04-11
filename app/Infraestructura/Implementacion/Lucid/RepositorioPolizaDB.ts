import { Es } from "App/Dominio/Datos/Entidades/Es";
import { Mx } from "App/Dominio/Datos/Entidades/Mx";
import { Pc } from "App/Dominio/Datos/Entidades/Pc";
import { RepositorioPoliza } from "App/Dominio/Repositorios/RepositorioPoliza";
import TblEss from "App/Infraestructura/Datos/Entidad/Es";
import TblPcs from "App/Infraestructura/Datos/Entidad/Pc";
import TblTiposPolizas from "App/Infraestructura/Datos/Entidad/TiposPoliza";
import TblPolizas from "App/Infraestructura/Datos/Entidad/poliza";
import TblMxs from "App/Infraestructura/Datos/Entidad/Mx";
import TblDetallesPolizaCoberturas from "App/Infraestructura/Datos/Entidad/DetallespolizaCobertura";
import { Responsabilidad } from "App/Dominio/Datos/Entidades/responsabilidad";
import TblResponsabilidades from "App/Infraestructura/Datos/Entidad/responsabilidades";

export class RepositorioPolizaDB implements RepositorioPoliza {
  async visualizar(modalidadId: number, vigiladoId: string): Promise<any> {
    let editable = true;

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
    return coberturasPorTipoAmparoYPoliza;
  }

  async guardar(datos: any, vigiladoId: string): Promise<any> {
    const {
      modalidadId,
      polizaContractual,
      pc,
      es,
      mx,
      polizaExtracontractual,
    } = datos;
    
    try {
      await this.guardarModalidades(modalidadId, vigiladoId, pc, es, mx);
      await this.guardarPoliza(modalidadId, polizaContractual, vigiladoId,1);
      await this.guardarPoliza(modalidadId, polizaExtracontractual, vigiladoId,2);
      return {
        mensaje: "Polizas guardada correctamente",
      };
    } catch (error) {
      console.log(error);
      
    }
  }

  guardarPoliza = async (
    modalidadId: number,
    poliza: any,
    vigiladoId: string,
    tipoPoliza:number
  ) => {

    let polizaId

    const polizaDBExiste = await TblPolizas.findBy('pol_numero', poliza.numero);
        
    if (polizaDBExiste) {
      polizaDBExiste.establecePolizaConId(poliza);
      await polizaDBExiste.save();
      polizaId = polizaDBExiste.id;
    }else{
      const polizaDB = new TblPolizas();
      polizaDB.establecerPolizaDb(poliza);
      polizaDB.modalidadId = modalidadId;
      polizaDB.vigiladoId = vigiladoId;
      polizaDB.tipoPolizaId = tipoPoliza;
      await polizaDB.save();
      polizaId = polizaDB.id;
    }
    const amparosIn = new Array();
    poliza.amparos.forEach((amparo) => {
      amparo.polizaId = polizaId;
      amparosIn.push(amparo);
    });
    
    if(poliza.responsabilidad && polizaId){
      await this.guardarResponsabilidad(poliza.responsabilidad, polizaId);
    }


    try {
      await TblDetallesPolizaCoberturas.updateOrCreateMany(['coberturaId','polizaId'],amparosIn);
      return {
        mensaje: "Poliza guardada correctamente",
      };
    } catch (error) {
      console.log(error);
      
    }


  };

  guardarModalidades = async (
    modalidadId: number,
    vigiladoId: string,
    pc?: Pc,
    es?: Es,
    mx?: Mx
  ) => {
    switch (modalidadId) {
      case 1:
        if (!pc) {
          throw new Error(
            "Los datos de Pasajeros por carretera (PC), son necesarios"
          );
        }
        await this.guardarPc(pc, vigiladoId);
        break;
      case 2:
        if (!es) {
          throw new Error(
            "Los datos de Transporte especial (ES), son necesarios"
          );
        }
        await this.guardarEs(es, vigiladoId);
        break;
      case 3:
        if (!mx) {
          throw new Error("Empresa de transporte mixto (MX), son necesarios");
        }
        await this.guardarMx(mx, vigiladoId);
        break;
    }
  };

  guardarPc = async (pc: Pc, vigiladoId: string) => {
    try {
      const pcDBExtiste = await TblPcs.findBy("pac_vigilado_id", vigiladoId);
      if (pcDBExtiste) {
        pcDBExtiste.establecePcConId(pc);
        await pcDBExtiste.save();
        return pcDBExtiste;
      } else {
        const pcBD = new TblPcs();
        pcBD.establecerPcDb(pc);
        pcBD.vigiladoId = vigiladoId;
        await pcBD.save();
        return pcBD;
      }
    } catch (error) {
      console.log(error);
    }
  };

  guardarEs = async (es: Es, vigiladoId: string) => {
    try {
      const esDBExtiste = await TblEss.findBy("tre_vigilado_id", vigiladoId);
      if (esDBExtiste) {
        esDBExtiste.estableceEsConId(es);
        await esDBExtiste.save();
        return esDBExtiste;
      } else {
        const esBD = new TblEss();
        esBD.establecerEsDb(es);
        esBD.vigiladoId = vigiladoId;
        await esBD.save();
        return esBD;
      }
    } catch (error) {
      console.log(error);
    }
  };

  guardarMx = async (mx: Mx, vigiladoId: string) => {
    try {
      const mxDBExtiste = await TblMxs.findBy("trm_vigilado_id", vigiladoId);
      if (mxDBExtiste) {
        mxDBExtiste.estableceMxConId(mx);
        await mxDBExtiste.save();
        return mxDBExtiste;
      } else {
        const mxBD = new TblMxs();
        mxBD.establecerMxDb(mx);
        mxBD.vigiladoId = vigiladoId;
        await mxBD.save();
        return mxBD;
      }
    } catch (error) {
      console.log(error);
    }
  };

  guardarResponsabilidad = async (
    responsabilidad: Responsabilidad,
    polizaId: number
  ) => {
    try {
      const respondabilidadBDExiste = await TblResponsabilidades.findBy(
        "res_poliza_id",
        polizaId
      );
      if (respondabilidadBDExiste) {
        respondabilidadBDExiste.estableceResponsabilidadConId(responsabilidad);
        await respondabilidadBDExiste.save();
        return respondabilidadBDExiste;
      } else {
        const responsabilidadBD = new TblResponsabilidades();
        responsabilidadBD.establecerResponsabilidadDb(responsabilidad);
        responsabilidadBD.polizaId = polizaId;
        await responsabilidadBD.save();
        return responsabilidadBD;
      }
    } catch (error) {
      console.log(error);
    }
  };

  guardarDetalles = (amparosIn) =>{

  }
}
