import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';


export default class TblCapacidades extends BaseModel {
  @column({ isPrimary: true, columnName: 'cap_id' })  public id?: number  
  @column({ columnName: 'cap_numero' }) public numero: string
  @column({ columnName: 'cap_inicio_vigencia' }) public vigencia: string
  @column({ columnName: 'cap_nombre_archivo' }) public nombre: string
  @column({ columnName: 'cap_nombre_original_archivo' }) public nombreOriginal: string
  @column({ columnName: 'cap_ruta_archivo' }) public ruta: string
  @column({ columnName: 'cap_modalidad_id' }) public modalidadId: number
  @column({ columnName: 'cap_vigilado_id' }) public vigiladoId?: string

  @column.dateTime({ autoCreate: true , columnName: 'cap_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'cap_actualizado' }) public updatedAt: DateTime 

}
