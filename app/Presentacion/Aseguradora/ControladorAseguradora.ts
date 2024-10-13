/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioAseguradora } from 'App/Dominio/Datos/Servicios/ServicioAseguradora'
import { RepositorioAseguradoraDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioAseguradoraDB'

export default class ControladorAseguradora {  
  private service: ServicioAseguradora
  constructor () {
    this.service = new ServicioAseguradora(new RepositorioAseguradoraDB())
  }

  public async obtenerAseguradoraPorPolizaId({ params, response }: HttpContextContract) {
    const { polAseguradoraId } = params;

    // Verifica que el ID es un número
    const id = parseInt(polAseguradoraId, 10);
    if (isNaN(id)) {
        return response.status(400).json({ message: 'El ID de la aseguradora es inválido' });
    }

    try {
        const aseguradora = await this.service.obtenerAseguradoraPorPolizaId(id);
        if (aseguradora) {
            return response.json(aseguradora);
        }
        return response.status(404).json({ message: 'Aseguradora no encontrada' });
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}


  

  public async obtenerAseguradoras ({response, request}:HttpContextContract){
      const aseguradoras = await this.service.obtenerAseguradoras(request.all())
      return response.status(200).send(aseguradoras);
  }

  public async obtenerAseguradora ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'El id es necesario'});
    }
    const aseguradora = await this.service.obtenerAseguradora(id)
      return response.status(200).send(aseguradora);
  }

  public async crearAseguradora ({response, request}:HttpContextContract){
    try {      
      const aseguradoraIn:any  = request.all()
      const aseguradora = await this.service.crearAseguradora(aseguradoraIn)
      return response.created(aseguradora)
    } catch (error) {
      return response.badRequest(error.messages)
    }
    
  }
  public async actualizarAseguradoraAll ({response, request}:HttpContextContract){
    try {      
      const aseguradoraIn: any = request.all()
      const aseguradora = await this.service.actualizarAseguradoraAll(aseguradoraIn)
      return response.created(aseguradora)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
  public async eliminarAseguradora ({response, params}:HttpContextContract){
    const id = params.id
    if(!id){
      return response.status(400).send({message:'El Id es necesario'});
    }
    await this.service.eliminarAseguradora(id)
    return response.status(400).send({message:'Eliminada correctamente'});
  
  }
}
