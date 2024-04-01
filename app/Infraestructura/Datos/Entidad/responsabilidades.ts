import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import TblPolizas from './poliza';

export default class TblResponsabilidades extends BaseModel {
  @column({ isPrimary: true, columnName: 'res_id' })  public id: number  

  @column({ columnName: 'res_poliza_id' }) public polzaId: number
  @column({ columnName: 'res_fecha_construccion' }) public fechaConstruccion: string
  @column({ columnName: 'res_resolucion' }) public resolucion: number
  @column({ columnName: 'res_fecha_resolucion' }) public fechaResolucion: string
  @column({ columnName: 'res_valor_reserva' }) public valorReserva: number
  @column({ columnName: 'res_fecha_reserva' }) public fechaReserva: string
  @column({ columnName: 'res_informacion' }) public informacion: string
  @column({ columnName: 'res_operacion' }) public operacion: number
  @column({ columnName: 'res_valor_cumplimiento_uno' }) public valorCumplimienteUno: number
  @column({ columnName: 'res_valor_cumplimiento_dos' }) public valorCumplimienteDos: number
  @column.dateTime({ autoCreate: true , columnName: 'res_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'res_actualizado' }) public updatedAt: DateTime 

  @belongsTo(() => TblPolizas, {
    localKey: 'id',
    foreignKey: 'polizaId',
  })
  public poliza: BelongsTo<typeof TblPolizas>


}
