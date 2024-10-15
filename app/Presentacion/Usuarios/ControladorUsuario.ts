/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioUsuarios } from 'App/Dominio/Datos/Servicios/ServicioUsuarios'
import { GeneradorContrasena } from 'App/Dominio/GenerarContrasena/GenerarContrasena'
import { EncriptadorAdonis } from 'App/Infraestructura/Encriptacion/EncriptadorAdonis'
import { RepositorioUsuariosDB } from '../../Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB'
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis'
import { ServicioPoliza } from 'App/Dominio/Datos/Servicios/ServicioPoliza'
import { RepositorioPolizaDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioPolizaDB'; 
//import {ControladorUsuario} from 'App/presentacion/usuarios/ControladorUsuario';


export default class ControladorUsuario {
  private service: ServicioUsuarios
  private servicioPoliza: ServicioPoliza; 
  constructor () {
    
    this.service = new ServicioUsuarios(
      new RepositorioUsuariosDB(), 
      new GeneradorContrasena(), 
      new EncriptadorAdonis(),
      new EnviadorEmailAdonis()
    );
    this.servicioPoliza = new ServicioPoliza(new RepositorioPolizaDB())
  }

  public async listar ({ request }:HttpContextContract) {
    const usuarios = await this.service.obtenerUsuarios(request.all())
    return usuarios
  }

 

 public async consultarPoliza({ params, response }: HttpContextContract) {
  try {
    const usn_identificacion = params.usn_identificacion; 

    if (!usn_identificacion) {
      return response.badRequest({ message: 'El ID del usuario es requerido.' });
    }

    
    const polizas = await this.servicioPoliza.obtenerPolizasPorUsuario(usn_identificacion);

    if (!polizas || polizas.length === 0) {
      
      return response.ok({
        message: 'Pólizas asociadas a la empresa',
        status: 200,
        polizas: []
      });
    }

    
    return response.ok({
      message: 'Pólizas asociadas a la empresa',
      status: 200,
      polizas: polizas
    });

  } catch (error) {
    console.error('Error al consultar pólizas:', error);
    return response.internalServerError({ message: 'Error al consultar pólizas' });
  }
}



  public async obtenerUsuarioPorId ({ params }) {
    const usuario = await this.service.obtenerUsuarioPorId(params.id)
    return usuario
  }

  public async obtenerUsuarioPorUsuario ({ request }:HttpContextContract) {
    const usuario = await this.service.obtenerUsuarioPorUsuario(request.param('usuario'))
    return usuario
  }

  public async actualizarUsuario ({ params, request }) {
    const payload = await request.obtenerPayloadJWT()
    const dataUsuario = request.all()
    const usuario = await this.service.actualizarUsuario(params.id, dataUsuario, payload)
    return usuario
  }

  public async guardarUsuario ({ request }) {
    const dataUsuario = request.all()
    const payload = await request.obtenerPayloadJWT()
    const usuario = await this.service.guardarUsuario(dataUsuario, payload)
    return usuario
  }

  public async guardardesdepeccit ({ request }) {
    const dataUsuario = request.all()
    //const payload = await request.obtenerPayloadJWT()
    const usuario = await this.service.guardarUsuariodesdepeccit(dataUsuario)
    return {usuario:usuario, clave:this.service.clave}
  }

  public async cambiarEstado ({request, response}:HttpContextContract){
    try{
      let id = request.param('id')
      await this.service.cambiarEstado(id)
      response.status(200).send('Cambio realizado correctamente')
    } catch (e) {
      response.status(200).send(e)
    }
  }
}