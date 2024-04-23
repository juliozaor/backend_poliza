/* import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import TblPolizas from './poliza';

export default class TblVehiculos extends BaseModel {
  @column({ isPrimary: true, columnName: 'arc_id' })  public id: number  
  @column({ columnName: 'arc_poliza_id' }) public polzaId: number
  
  @column({ columnName: 'arc_nombre' }) public nombre: string
  @column({ columnName: 'arc_nombre_original' }) public nombreOriginal: number
  @column({ columnName: 'arc_ruta' }) public ruta: string
  @column({ columnName: 'arc_valor_cumplimiento_uno' }) public valorCumplimienteUno: number
  @column({ columnName: 'arc_valor_cumplimiento_dos' }) public valorCumplimienteDos: number

  @column.dateTime({ autoCreate: true , columnName: 'arc_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'arc_actualizado' }) public updatedAt: DateTime 

  @belongsTo(() => TblPolizas, {
    localKey: 'id',
    foreignKey: 'polizaId',
  })
  public poliza: BelongsTo<typeof TblPolizas>


} */
