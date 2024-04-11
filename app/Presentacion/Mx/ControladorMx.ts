/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioMx } from 'App/Dominio/Datos/Servicios/ServicioMx'
import { RepositorioMxDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioMxDB'

export default class ControladorMx {  
  private service: ServicioMx
  constructor () {
    this.service = new ServicioMx(new RepositorioMxDB())
  }


  public async obtenerMxs ({response, request}:HttpContextContract){
      const mxs = await this.service.obtenerMxs(request.all())
      return response.status(200).send(mxs);
  }

  public async obtenerMx ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'El id es necesario'});
    }
    const mx = await this.service.obtenerMx(id)
      return response.status(200).send(mx);
  }

  public async obtenerMxVigilado ({response, request}:HttpContextContract){
    const { id } = await request.obtenerPayloadJWT()
    const mx = await this.service.obtenerMxVigilado(id)
      return response.status(200).send(mx);
  }

  public async crearMx ({response, request}:HttpContextContract){
    try {      
      const mxIn:any  = request.all()
       const { id } = await request.obtenerPayloadJWT()
       mxIn.vigiladoId = id
      const mx = await this.service.crearMx(mxIn)
      return response.created(mx)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async actualizarMxAll ({response, request}:HttpContextContract){
    try {      
      const mxIn: any = request.all()
      const { id } = await request.obtenerPayloadJWT()
      mxIn.vigiladoId = id
      const mx = await this.service.actualizarMxAll(mxIn)
      return response.created(mx)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async eliminarMx ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'El Id es necesario'});
    }
    await this.service.eliminarMx(id)
    return response.status(400).send({message:'Eliminacion exitosa'});
  
  }
}
