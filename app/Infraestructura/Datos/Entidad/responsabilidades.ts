import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import TblPolizas from './poliza';
import { Responsabilidad } from 'App/Dominio/Datos/Entidades/responsabilidad';

export default class TblResponsabilidades extends BaseModel {
  @column({ isPrimary: true, columnName: 'res_id' })  public id?: number 

  @column({ columnName: 'res_poliza' }) public poliza?: number
  @column({ columnName: 'res_fecha_constitucion' }) public fechaConstitucion: string
  @column({ columnName: 'res_resolucion' }) public resolucion: number
  @column({ columnName: 'res_fecha_resolucion' }) public fechaResolucion: string
  @column({ columnName: 'res_valor_reserva' }) public valorReserva: number
  @column({ columnName: 'res_fecha_reserva' }) public fechaReserva: string
  @column({ columnName: 'res_informacion' }) public informacion: string
  @column({ columnName: 'res_operacion' }) public operacion: number
  @column({ columnName: 'res_valor_cumplimiento_uno' }) public valorCumplimientoUno: number
  @column({ columnName: 'res_valor_cumplimiento_dos' }) public valorCumplimientoDos: number
  @column.dateTime({ autoCreate: true , columnName: 'res_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'res_actualizado' }) public updatedAt: DateTime 

  public establecerResponsabilidadDb (responsabilidad: Responsabilidad) {
    this.id = responsabilidad.id
    this.poliza = responsabilidad.poliza
    this.fechaConstitucion = responsabilidad.fechaConstitucion
    this.resolucion = responsabilidad.resolucion
    this.fechaResolucion = responsabilidad.fechaResolucion
    this.valorReserva = responsabilidad.valorReserva
    this.fechaReserva = responsabilidad.fechaReserva
    this.informacion = responsabilidad.informacion
    this.operacion = responsabilidad.operacion
    this.valorCumplimientoUno = responsabilidad.valorCumplimientoUno
    this.valorCumplimientoDos = responsabilidad.valorCumplimientoDos
  }

  public estableceResponsabilidadConId (responsabilidad: Responsabilidad) {
    this.poliza = responsabilidad.poliza
    this.fechaConstitucion = responsabilidad.fechaConstitucion
    this.resolucion = responsabilidad.resolucion
    this.fechaResolucion = responsabilidad.fechaResolucion
    this.valorReserva = responsabilidad.valorReserva
    this.fechaReserva = responsabilidad.fechaReserva
    this.informacion = responsabilidad.informacion
    this.operacion = responsabilidad.operacion
    this.valorCumplimientoUno = responsabilidad.valorCumplimientoUno
    this.valorCumplimientoDos = responsabilidad.valorCumplimientoDos
  }

  public obtenerResponsabilidad (): Responsabilidad {
    const responsabilidad = new Responsabilidad()
    responsabilidad.id = this.id
    responsabilidad.poliza = this.poliza
    responsabilidad.fechaConstitucion = this.fechaConstitucion
    responsabilidad.resolucion = this.resolucion
    responsabilidad.fechaResolucion = this.fechaResolucion
    responsabilidad.valorReserva = this.valorReserva
    responsabilidad.fechaReserva = this.fechaReserva
    responsabilidad.informacion = this.informacion
    responsabilidad.operacion = this.operacion
    responsabilidad.valorCumplimientoUno = this.valorCumplimientoUno
    responsabilidad.valorCumplimientoDos = this.valorCumplimientoDos
    return responsabilidad
  }

  @belongsTo(() => TblPolizas, {
    localKey: 'numero',
    foreignKey: 'poliza',
  })
  public polizas: BelongsTo<typeof TblPolizas>


}
