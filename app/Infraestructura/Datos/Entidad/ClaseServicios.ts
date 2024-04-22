import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';

export default class TblClaseServicios extends BaseModel {
  @column({ isPrimary: true, columnName: 'cse_id' })  public id: number  
  @column({ columnName: 'cse_nombre' }) public nombre: string
  @column({ columnName: 'cse_estado' }) public estado: boolean
}
