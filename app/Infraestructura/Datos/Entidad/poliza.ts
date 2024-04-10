import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import TblAseguradoras from './Aseguradoras';
import TblModalidades from './Modalidades';

export default class TblPolizas extends BaseModel {
  @column({ isPrimary: true, columnName: 'pol_id' })  public id: number  
  @column({ columnName: 'pol_numero' }) public numero: number
  @column({ columnName: 'pol_inicio_vigencia' }) public inicioVigencia: string
  @column({ columnName: 'pol_fin_vigencia' }) public FinVigencia: string
  @column({ columnName: 'pol_aseguradora_id' }) public aseguradoraId: number
  @column({ columnName: 'pol_modalidad_id' }) public modalidadId: number
  @column({ columnName: 'pol_estado' }) public estado: boolean
  @column.dateTime({ autoCreate: true , columnName: 'pol_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'pol_actualizado' }) public updatedAt: DateTime

  @belongsTo(() => TblAseguradoras, {
    localKey: 'id',
    foreignKey: 'aseguradoraId',
  })
  public aseguradoras: BelongsTo<typeof TblAseguradoras>

  @belongsTo(() => TblModalidades, {
    localKey: 'id',
    foreignKey: 'modalidadId',
  })
  public modalidades: BelongsTo<typeof TblModalidades>


}
