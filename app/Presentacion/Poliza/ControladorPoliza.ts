/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioPoliza } from 'App/Dominio/Datos/Servicios/ServicioPoliza'
import { RepositorioPolizaDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioPolizaDB'

export default class ControladorRol {
  private service: ServicioPoliza
  constructor () {
    this.service = new ServicioPoliza(new RepositorioPolizaDB())
  }

  public async visualizar ({request,response}:HttpContextContract ){
    const {modalidadId} = request.all()
    if(!modalidadId){
      return response.status(400).json({
        mensaje: 'modalidadId es requerido'
      }) 
     }
    const { id } = await request.obtenerPayloadJWT()
    const polizas = await this.service.visualizar(modalidadId, id)
    return polizas
  }

  public async guardar ({request, response}:HttpContextContract ){
    
   const { id } = await request.obtenerPayloadJWT()
    const polizas = await this.service.guardar(request.all(), id)
    return polizas
  }

  
  public async capacidad ({request, response}:HttpContextContract ){
    
    const { id } = await request.obtenerPayloadJWT()
     const polizas = await this.service.capacidad(request.all(), id)
     return polizas
   }

   public async obtenerVehiculos ({request, response}:HttpContextContract ){
    
    const { id } = await request.obtenerPayloadJWT()
     const vehiculos = await this.service.obtenerVehiculos(request.all(), id)
     return vehiculos
   }

}
