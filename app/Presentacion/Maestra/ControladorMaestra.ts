/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TblAseguradoras from "App/Infraestructura/Datos/Entidad/Aseguradoras";
import TblModalidades from "App/Infraestructura/Datos/Entidad/Modalidades";
export default class ControladorMaestra {
  public async modalidades({ request }: HttpContextContract) {
    const modalidades = await TblModalidades.all();
    return { modalidades };
  }

  public async aseguradoras({ request }: HttpContextContract) {
    const aseguradoras = await TblAseguradoras.all();
    aseguradoras.map((aseguradora) => {
      return {
        id: aseguradora.id,
        nit: aseguradora.nit,
        nombre: aseguradora.nombre,
        estado: aseguradora.estado,
      };
    });
    return { aseguradoras };
  }
}
