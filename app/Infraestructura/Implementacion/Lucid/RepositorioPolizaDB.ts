import { RepositorioPoliza } from "App/Dominio/Repositorios/RepositorioPoliza";
import TblTiposPolizas from "App/Infraestructura/Datos/Entidad/TiposPoliza";

export class RepositorioPolizaDB implements RepositorioPoliza {
  async visualizar(): Promise<any> {
    const tiposPoliza = await TblTiposPolizas.query().preload(
      "coberturas",
      (sqlCob) => {
        sqlCob.preload("tiposAmparo");
        sqlCob.orderBy("orden", "asc");
      }
    );

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
