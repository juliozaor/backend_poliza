import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import TblPolizas from './poliza';

export default class TblVehiculos extends BaseModel {
  @column({ isPrimary: true, columnName: 'veh_id' })  public id: number  
  @column({ columnName: 'veh_poliza_id' }) public polzaId: number
  
  @column({ columnName: 'veh_placa' }) public placa: string
  @column({ columnName: 'veh_pasajeros' }) public pasajeros: number
  @column({ columnName: 'veh_marca' }) public marca: string
  @column({ columnName: 'veh_modelo' }) public modelo: number
  @column({ columnName: 'veh_tipo_servicio' }) public tipoServicio: string
  @column({ columnName: 'veh_clase_servicio' }) public claseServicio: string
  @column({ columnName: 'veh_valor_cumplimiento_uno' }) public valorCumplimienteUno: number
  @column({ columnName: 'veh_valor_cumplimiento_dos' }) public valorCumplimienteDos: number

  @column.dateTime({ autoCreate: true , columnName: 'veh_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'veh_actualizado' }) public updatedAt: DateTime 

  @belongsTo(() => TblPolizas, {
    localKey: 'id',
    foreignKey: 'polizaId',
  })
  public poliza: BelongsTo<typeof TblPolizas>


}
