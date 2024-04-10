/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioPoliza } from 'App/Dominio/Datos/Servicios/ServicioPoliza'
import { RepositorioPolizaDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioPolizaDB'

export default class ControladorRol {
  private service: ServicioPoliza
  constructor () {
    this.service = new ServicioPoliza(new RepositorioPolizaDB())
  }

  public async visualizar ({request}:HttpContextContract ){
    const {modalidadId, poliza, aseguradoraId} = request.all()
    const polizas = await this.service.visualizar(modalidadId, poliza, aseguradoraId)
    return polizas
  }

}
