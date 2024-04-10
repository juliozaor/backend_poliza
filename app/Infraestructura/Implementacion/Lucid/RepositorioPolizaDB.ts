import { RepositorioPoliza } from "App/Dominio/Repositorios/RepositorioPoliza";
import TblTiposPolizas from "App/Infraestructura/Datos/Entidad/TiposPoliza";
import TblPolizas from "App/Infraestructura/Datos/Entidad/poliza";

export class RepositorioPolizaDB implements RepositorioPoliza {
  async visualizar(modalidadId:number, polizaId:number, aseguradoraId: number): Promise<any> {
    const consulta = TblTiposPolizas.query().preload(
      "coberturas",
      async (sqlCob) => {
        sqlCob.preload("tiposAmparo");
        sqlCob.orderBy("orden", "asc");

    /*     if(polizaId){          
          const poliza = await TblPolizas.query().where("pol_modalidad_id", modalidadId).where("pol_numero", polizaId).where("pol_aseguradora_id", aseguradoraId).first()
         
          if(poliza){
            sqlCob.preload('detalles', sqlDetalle =>{
              sqlDetalle.where('dpl_poliza_id', poliza.id)
            })
          }
        } */


      }
    );




    let tiposPoliza = await consulta

    const coberturasPorTipoAmparoYPoliza = tiposPoliza.reduce((acumulador, poliza) => {
      poliza.coberturas.forEach(cobertura => {       
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
    }, {});

    return coberturasPorTipoAmparoYPoliza;
  }
}
