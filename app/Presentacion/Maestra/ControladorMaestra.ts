/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TblModalidades from 'App/Infraestructura/Datos/Entidad/Modalidades'
export default class ControladorMaestra {

  public async modalidades ({ request }:HttpContextContract) {
    const modalidades = await TblModalidades.all()
    return modalidades
  }

}
