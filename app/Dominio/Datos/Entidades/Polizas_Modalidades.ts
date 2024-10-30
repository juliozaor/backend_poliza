import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ModalidadPoliza from './ModalidadPoliza';

export default class TblPolizasModalidades extends BaseModel {
  
  public static table = 'tbl_polizas_modalidades'

 
  @column({ isPrimary: true })
  public id: number

  
  @column()
  public pol_id: number

 
  @column()
  public modpol_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => ModalidadPoliza, {
    localKey: 'modpol_id',  // Campo de TblPolizasModalidades
    foreignKey: 'modpol_id',  // Campo de ModalidadPoliza
  })
  public obj_modalidad: HasOne<typeof ModalidadPoliza>;

 
 
  
}
