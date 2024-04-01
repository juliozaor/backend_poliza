import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';

export default class TblTiposAmparos extends BaseModel {
  @column({ isPrimary: true, columnName: 'tam_id' })  public id: number  
  @column({ columnName: 'tam_nombre' }) public nombre: string
  @column({ columnName: 'tam_orden' }) public orden: number
  @column({ columnName: 'tam_estado' }) public estado: boolean

}
