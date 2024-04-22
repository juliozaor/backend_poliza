import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';

export default class TblTipoServicios extends BaseModel {
  @column({ isPrimary: true, columnName: 'tis_id' })  public id: number  
  @column({ columnName: 'tis_nombre' }) public nombre: string
  @column({ columnName: 'tis_estado' }) public estado: boolean
}
