/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioPc } from 'App/Dominio/Datos/Servicios/ServicioPc'
import { RepositorioPcDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioPcDB'

export default class ControladorPc {  
  private service: ServicioPc
  constructor () {
    this.service = new ServicioPc(new RepositorioPcDB())
  }


  public async obtenerPcs ({response, request}:HttpContextContract){
      const pcs = await this.service.obtenerPcs(request.all())
      return response.status(200).send(pcs);
  }

  public async obtenerPc ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'El id es necesario'});
    }
    const pc = await this.service.obtenerPc(id)
      return response.status(200).send(pc);
  }

  public async obtenerPcVigilado ({response, request}:HttpContextContract){
    const { id } = await request.obtenerPayloadJWT()
    const pc = await this.service.obtenerPcVigilado(id)
      return response.status(200).send(pc);
  }


  public async crearPc ({response, request}:HttpContextContract){
    try {      
      const pcIn:any  = request.all()
      const { id } = await request.obtenerPayloadJWT()
      pcIn.vigiladoId = id
      const pc = await this.service.crearPc(pcIn)
      return response.created(pc)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async actualizarPcAll ({response, request}:HttpContextContract){
    try {      
      const pcIn: any = request.all()
      const { id } = await request.obtenerPayloadJWT()
      pcIn.vigiladoId = id
      const pc = await this.service.actualizarPcAll(pcIn)
      return response.created(pc)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async eliminarPc ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'El Id es necesario'});
    }
    await this.service.eliminarPc(id)
    return response.status(400).send({message:'Eliminacion exitosa'});
  
  }
}
