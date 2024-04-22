import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';

export default class TblMarcas extends BaseModel {
  @column({ isPrimary: true, columnName: 'mar_id' })  public id: number  
  @column({ columnName: 'mar_nombre' }) public nombre: string
  @column({ columnName: 'mar_estado' }) public estado: boolean
}
