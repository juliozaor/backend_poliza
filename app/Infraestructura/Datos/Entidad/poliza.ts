import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import TblAseguradoras from './Aseguradoras';

export default class TblPolizas extends BaseModel {
  @column({ isPrimary: true, columnName: 'pol_id' })  public id: number  
  @column({ columnName: 'pol_numero' }) public numero: number
  @column({ columnName: 'pol_inicio_vigencia' }) public inicioVigencia: string
  @column({ columnName: 'pol_fin_vigencia' }) public FinVigencia: string
  @column({ columnName: 'pol_aseguradora_id' }) public aseguradoraId: number
  @column({ columnName: 'pol_estado' }) public estado: boolean
  @column.dateTime({ autoCreate: true , columnName: 'pol_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'pol_actualizado' }) public updatedAt: DateTime

  @belongsTo(() => TblAseguradoras, {
    localKey: 'id',
    foreignKey: 'tipoAmparo',
  })
  public aseguradoras: BelongsTo<typeof TblAseguradoras>


}
