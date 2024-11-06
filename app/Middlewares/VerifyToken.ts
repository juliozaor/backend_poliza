import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyTokenMiddleware {
    async handle(ctx: HttpContextContract, next: () => Promise<void>) {
      // Obtener el token del encabezado Authorization
      const authHeader = ctx.request.header('Authorization')
  
      // Definir el token que quieres validar
      const validToken = 'Bearer 2c9b417a-75af-46c5-8ca0-340d3acdb3c7'
  
      // Verificar si el token coincide
      if (!authHeader || authHeader !== validToken) {
        return ctx.response.status(401).json({
          message: 'Unauthorized access. Invalid token.',
        })
      }
  
      // Si el token es válido, continuar con la solicitud
      await next()
    }
}
