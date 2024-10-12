import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TblPolizasModalidades extends BaseModel {
  // Especificar el nombre correcto de la tabla
  public static table = 'tbl_polizas_modalidades'

  // Usar la columna correcta como clave primaria
  @column({ isPrimary: true })
  public id: number

  // Clave foránea a la tabla tbl_polizas
  @column()
  public pol_id: number

  // Clave foránea a la tabla tbl_modalidadpolizas
  @column()
  public modpol_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
