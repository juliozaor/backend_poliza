import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import TblPolizas from './poliza';
import TblCoberturas from './Coberturas';

export default class TblDetallesPolizaCoberturas extends BaseModel {
  @column({ isPrimary: true, columnName: 'dpl_id' })  public id: number  
  @column({ columnName: 'dpl_valor_asegurado' }) public valorAsegurado: number
  @column({ columnName: 'dpl_limite' }) public limite: number
  @column({ columnName: 'dpl_deducible' }) public deducible: number
  @column({ columnName: 'dpl_poliza' }) public poliza: number
  @column({ columnName: 'dpl_cobertura_id' }) public coberturaId: number
  @column({ columnName: 'cobertura_descricpion' }) public cobertura_descricpion: string
  @column({ columnName: 'cobertura_nombre' }) public cobertura_nombre: string
  @column({ columnName: 'tipo' }) public tipo: string
  
  
  @column.dateTime({ autoCreate: true , columnName: 'dpl_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'dpl_actualizado' }) public updatedAt: DateTime

  
  @belongsTo(() => TblPolizas, {
    localKey: 'numero',
    foreignKey: 'poliza',
  })
  public polizas: BelongsTo<typeof TblPolizas>

  @belongsTo(() => TblCoberturas, {
    localKey: 'id',
    foreignKey: 'coberturaId',
  })
  public cobertura: BelongsTo<typeof TblCoberturas>


}
