import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany} from '@ioc:Adonis/Lucid/Orm';
import TblTiposAmparos from './TiposAmparo';
import TblTiposPolizas from './TiposPoliza';
import TblDetallesPolizaCoberturas from './DetallespolizaCobertura';

export default class TblCoberturas extends BaseModel {
  @column({ isPrimary: true, columnName: 'cob_id' })  public id: number  
  @column({ columnName: 'cob_nombre' }) public nombre: string
  @column({ columnName: 'cob_descripcion' }) public descripcion: string
  @column({ columnName: 'cob_tipo_amparo_id' }) public tipoAmparo: number
  @column({ columnName: 'cob_tipo_poliza_id' }) public tipoPoliza: number
  @column({ columnName: 'cob_orden' }) public orden: number
  @column({ columnName: 'cob_estado' }) public estado: boolean

  @belongsTo(() => TblTiposAmparos, {
    localKey: 'id',
    foreignKey: 'tipoAmparo',
  })
  public tiposAmparo: BelongsTo<typeof TblTiposAmparos>

  @belongsTo(() => TblTiposPolizas, {
    localKey: 'id',
    foreignKey: 'tipoPoliza',
  })
  public tipospoliza: BelongsTo<typeof TblTiposPolizas>

  @hasMany (() => TblDetallesPolizaCoberturas, {
    localKey: 'id',
    foreignKey: 'coberturaId',
  })
  public detalles: HasMany<typeof TblDetallesPolizaCoberturas>


}
