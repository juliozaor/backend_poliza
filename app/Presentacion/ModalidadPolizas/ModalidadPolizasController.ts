import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ModalidadPoliza from 'App/Dominio/Datos/Entidades/ModalidadPoliza'

export default class ModalidadPolizasController {
  // Listar todas las modalidades
  public async index({ response }: HttpContextContract) {
    const modalidades = await ModalidadPoliza.all()
    return response.json(modalidades) // Enviando la lista de modalidades
  }

  // Crear una nueva modalidad
  public async store({ request, response }: HttpContextContract) {
    const { modpol_nombre, modpol_estado } = request.only(['modpol_nombre', 'modpol_estado'])
    const modalidad = await ModalidadPoliza.create({ modpol_nombre, modpol_estado })
    return response.status(201).json(modalidad) // Enviando la modalidad creada
  }

  // Obtener una modalidad específica
  public async show({ params, response }: HttpContextContract) {
    const modalidad = await ModalidadPoliza.find(params.id)
    if (!modalidad) {
      return response.status(404).send('No se encontró la modalidad') // Enviando un mensaje si no se encuentra
    }
    return response.json(modalidad) // Enviando la modalidad encontrada
  }

  // Actualizar una modalidad existente
  public async update({ params, request, response }: HttpContextContract) {
    const modalidad = await ModalidadPoliza.find(params.id)
    if (!modalidad) {
      return response.status(404).send('No se encontró la modalidad') // Enviando un mensaje si no se encuentra
    }
    modalidad.modpol_nombre = request.input('modpol_nombre')
    modalidad.modpol_estado = request.input('modpol_estado')
    await modalidad.save()
    return response.json(modalidad) // Enviando la modalidad actualizada
  }

  // Eliminar una modalidad
  public async destroy({ params, response }: HttpContextContract) {
    const modalidad = await ModalidadPoliza.find(params.id)
    if (!modalidad) {
      return response.status(404).send('No se encontró la modalidad') // Enviando un mensaje si no se encuentra
    }
    await modalidad.delete()
    return response.status(204) // Respuesta vacía para confirmación de eliminación
  }
}
