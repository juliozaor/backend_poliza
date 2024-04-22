import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany} from '@ioc:Adonis/Lucid/Orm';
import TblDetallesPolizaCoberturas from './DetallespolizaCobertura';

export default class TblCoberturas extends BaseModel {
  @column({ isPrimary: true, columnName: 'cob_id' })  public id: number  
  @column({ columnName: 'cob_nombre' }) public nombre: string
  @column({ columnName: 'cob_descripcion' }) public descripcion: string
  @column({ columnName: 'cob_orden' }) public orden: number
  @column({ columnName: 'cob_estado' }) public estado: boolean


  @hasMany (() => TblDetallesPolizaCoberturas, {
    localKey: 'id',
    foreignKey: 'coberturaId',
  })
  public detalles: HasMany<typeof TblDetallesPolizaCoberturas>


}
