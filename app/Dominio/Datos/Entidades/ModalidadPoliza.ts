import { DateTime } from 'luxon'
//import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import TblPolizasModalidades from './Polizas_Modalidades'

export default class ModalidadPoliza extends BaseModel {
  // Especificar el nombre correcto de la tabla
  public static table = 'tbl_modalidadpolizas'

  // Usar la columna correcta como clave primaria
  @column({ isPrimary: true })
  public modpol_id: number // Clave primaria correcta, ajusta según tu tabla

  @column()
  public modpol_nombre: string

  @column()
  public obj_modalidad: string

  @column()
  public modpol_estado: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  

  @hasMany(() => TblPolizasModalidades, {
    localKey: 'id',
    foreignKey: 'modpol_id', 
  })
  public polizas: HasMany<typeof TblPolizasModalidades>

   
}
