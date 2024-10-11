/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioPoliza } from 'App/Dominio/Datos/Servicios/ServicioPoliza'
import { RepositorioPolizaDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioPolizaDB'

export default class ControladorRol {
  private service: ServicioPoliza
  constructor () {
    this.service = new ServicioPoliza(new RepositorioPolizaDB())
  }

 
  public async filtrarPolizas({ request, response }: HttpContextContract) {
    const usn_identificacion = request.input('usn_identificacion');
    const pol_numero = request.input('pol_numero');
    const page = request.input('page', 1);
    const limit = request.input('limit', 10);

    if (!usn_identificacion) {
      return response.status(400).json({ message: 'El campo usn_identificacion es requerido.' });
    }

    try {
      const polizas = await this.service.filtrarPolizas(
        usn_identificacion,
        pol_numero,
        Number(page),
        Number(limit)
      );
      return response.json(polizas);
    } catch (error) {
      return response.status(500).json({ message: 'Error al filtrar pólizas', error: error.message });
    }
  }





  public async visualizar ({request,response}:HttpContextContract ){
    const {modalidadId} = request.all()
    /* if(!modalidadId){
      return response.status(400).json({
        mensaje: 'modalidadId es requerido'
      }) 
     } */
    const { id } = await request.obtenerPayloadJWT()
    const polizas = await this.service.visualizar(request.all(), id)
    return polizas
  }

  public async guardar ({request, response}:HttpContextContract ){
    
   const { id } = await request.obtenerPayloadJWT()
   try {
    
    
     const polizas = await this.service.guardar(request.all(), id)

     return polizas
   } catch (error) {
    
    throw error;
    
   }
  }

 
  public async capacidad ({request, response}:HttpContextContract ){
    
    const { id } = await request.obtenerPayloadJWT()
    try {
      const polizas = await this.service.capacidad(request.all(), id)
      return polizas
     
    } catch (error) {
      throw error;
    }
   }

  public async obtenerVehiculos ({request, response}:HttpContextContract ){
    
    const { id } = await request.obtenerPayloadJWT()
     const vehiculos = await this.service.obtenerVehiculos(request.all(), id)
     return vehiculos
   } 



   public async listarPolizas ({request, response}:HttpContextContract ){
    
    const { id } = await request.obtenerPayloadJWT()
    try {     
     
      const polizas = await this.service.listarPolizas(request.all(), id)
 
      return polizas
    } catch (error) {
     
     throw error;
     
    }
   }

   public async listarVehiculos ({request, response}:HttpContextContract ){
    
    const { id } = await request.obtenerPayloadJWT()
    try {     
     
      const polizas = await this.service.listarVehiculos(request.all(), id)
 
      return polizas
    } catch (error) {
     
     throw error;
     
    }
   }

   public async eliminarVehiculos ({request, response}:HttpContextContract ){
    
    const { id } = await request.obtenerPayloadJWT()
    try {     
     
      const polizas = await this.service.eliminarVehiculos(request.all(), id)
 
      return polizas
    } catch (error) {
     
     throw error;
     
    }
   }

   public async agregarVehiculos ({request, response}:HttpContextContract ){
    
    const { id } = await request.obtenerPayloadJWT()
    try {     
     
      const polizas = await this.service.agregarVehiculos(request.all(), id)
 
      return polizas
    } catch (error) {
     
     throw error;
     
    }
   }


   public async interoperabilidad ({request,response}:HttpContextContract ){
    const { documento, id } = await request.obtenerPayloadJWT()
    const placas = await this.service.interoperabilidad(request.all(), documento, id)
    return placas
  }

  public async novedadesPoliza ({request,response}:HttpContextContract ){
    const novedades = await this.service.novedadesPoliza(request.all())
    return novedades
  }

  public async gestionarPlaca ({request, response}:HttpContextContract ){
    
    const { id } = await request.obtenerPayloadJWT()
    const { placa } = request.all()
    try {     
     
      const polizas = await this.service.gestionarPlaca(placa, id)
 
      return polizas
    } catch (error) {
     
     throw error;
     
    }
   }

   public async desvincularPlaca ({request,response}:HttpContextContract ){
    const { id, motivo } = request.all()
    if (!id  || !motivo) {
      return response.status(400).json({ mensaje: 'Falta de información' })      
    }
    const placas = await this.service.desvincularPlaca(id, motivo )
    return placas
  }


}
