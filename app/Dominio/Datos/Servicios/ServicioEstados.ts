import TblEstadosEnviados from "App/Infraestructura/Datos/Entidad/EstadosEnviados"

export class ServicioEstados {

  public async EnviadosSt(vigilado: string,estado: number) {
    //Validar si ya existe el log
    
    const exiteEstado = await TblEstadosEnviados.query().where(
      {
        'env_estado': estado,
        'env_vigilado_id': vigilado
      })
      .first()


    if (!exiteEstado) {
      const enviado = new TblEstadosEnviados()
      enviado.estado = estado
      enviado.vigiladoId = vigilado
      await enviado.save()
    }

  }


}
