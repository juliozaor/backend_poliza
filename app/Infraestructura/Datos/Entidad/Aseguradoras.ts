import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';

export default class TblAseguradoras extends BaseModel {
  @column({ isPrimary: true, columnName: 'ase_id' })  public id: number  
  @column({ columnName: 'ase_nit' }) public nit: number
  @column({ columnName: 'ase_nombre' }) public nombre: string
  @column({ columnName: 'ase_direccion' }) public direccion: string
  @column({ columnName: 'ase_telefono' }) public telefono: number
  @column({ columnName: 'ase_estado' }) public estado: boolean
  @column.dateTime({ autoCreate: true , columnName: 'ase_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'ase_actualizado' }) public updatedAt: DateTime 


}
