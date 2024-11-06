
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TblEstadosEnviados from 'App/Infraestructura/Datos/Entidad/EstadosEnviados'


export default class ControladorEstados {


  public async enviadoSt ({ request, response }:HttpContextContract) {
    const { id } = await request.obtenerPayloadJWT()
    const enviado = await TblEstadosEnviados.query()
    .where('env_vigilado_id', id)
    .andWhere('env_estado',1).orderBy('env_id', 'desc')
    .first()
    if (enviado) {
      return response.ok({enviado: true})
    }
    return response.ok({enviado: false})

  }

  public async enviadoStPublica({ params, response }: HttpContextContract) {
    // Extrae el ID de los parámetros de la solicitud
    const { id } = params;

    // Verifica si el ID fue proporcionado
    if (!id) {
        return response.badRequest({ message: "El ID es requerido" });
    }

    // Aquí asumimos que ya has implementado la lógica para buscar el estado
    const enviado = await TblEstadosEnviados.query()
        .where('env_vigilado_id', id)
        .andWhere('env_estado', 1)
        .orderBy('env_id', 'desc')
        .first();

    // Retorna el resultado
    if (enviado) {
        return response.ok({ enviado: true });
    }
    return response.ok({ enviado: false });
}

}





