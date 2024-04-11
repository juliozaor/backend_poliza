/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioEs } from 'App/Dominio/Datos/Servicios/ServicioEs'
import { RepositorioEsDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioEsDB'

export default class ControladorEs {  
  private service: ServicioEs
  constructor () {
    this.service = new ServicioEs(new RepositorioEsDB())
  }


  public async obtenerEss ({response, request}:HttpContextContract){
      const ess = await this.service.obtenerEss(request.all())
      return response.status(200).send(ess);
  }

  public async obtenerEs ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'El id es necesario'});
    }
    const es = await this.service.obtenerEs(id)
      return response.status(200).send(es);
  }

  public async obtenerEsVigilado ({response, request}:HttpContextContract){
    const { id } = await request.obtenerPayloadJWT()
    const es = await this.service.obtenerEsVigilado(id)
      return response.status(200).send(es);
  }

  public async crearEs ({response, request}:HttpContextContract){
    try {      
      const esIn:any  = request.all()
      const { id } = await request.obtenerPayloadJWT()
      esIn.vigiladoId = id
      const es = await this.service.crearEs(esIn)
      return response.created(es)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async actualizarEsAll ({response, request}:HttpContextContract){
    try {      
      const esIn: any = request.all()
      const { id } = await request.obtenerPayloadJWT()
      esIn.vigiladoId = id
      const es = await this.service.actualizarEsAll(esIn)
      return response.created(es)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async eliminarEs ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'El Id es necesario'});
    }
    await this.service.eliminarEs(id)
    return response.status(400).send({message:'Eliminacion exitosa'});
  
  }
}
