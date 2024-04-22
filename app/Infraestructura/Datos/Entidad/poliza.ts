import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne} from '@ioc:Adonis/Lucid/Orm';
import TblAseguradoras from './Aseguradoras';
import { Poliza } from 'App/Dominio/Datos/Entidades/Poliza';
import TblResponsabilidades from './responsabilidades';

export default class TblPolizas extends BaseModel {
  @column({ isPrimary: true, columnName: 'pol_id' })  public id?: number  
  @column({ columnName: 'pol_numero' }) public numero: number
  @column({ columnName: 'pol_inicio_vigencia' }) public inicioVigencia: string
  @column({ columnName: 'pol_fin_vigencia' }) public finVigencia: string
  @column({ columnName: 'pol_aseguradora_id' }) public aseguradoraId: number
  @column({ columnName: 'pol_tipo_poliza_id' }) public tipoPolizaId?: number
  @column({ columnName: 'pol_vigilado_id' }) public vigiladoId?: string
  @column({ columnName: 'pol_estado' }) public estado?: boolean
  @column.dateTime({ autoCreate: true , columnName: 'pol_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'pol_actualizado' }) public updatedAt: DateTime

 

  public establecerPolizaDb (poliza: Poliza) {
    this.id = poliza.id
    this.numero = poliza.numero
    this.inicioVigencia = poliza.inicioVigencia
    this.finVigencia = poliza.finVigencia
    this.aseguradoraId = poliza.aseguradoraId
    this.tipoPolizaId = poliza.tipoPolizaId
    this.estado = poliza.estado
    this.vigiladoId = poliza.vigiladoId
  }

  public establecePolizaConId (poliza: Poliza) {
    this.numero = poliza.numero
    this.inicioVigencia = poliza.inicioVigencia
    this.finVigencia = poliza.finVigencia
    this.aseguradoraId = poliza.aseguradoraId
    this.tipoPolizaId = poliza.tipoPolizaId
    this.estado = poliza.estado
  }

  public obtenerPoliza (): Poliza {
    const poliza = new Poliza()
    poliza.id = this.id
    poliza.numero = this.numero
    poliza.inicioVigencia = this.inicioVigencia
    poliza.finVigencia = this.finVigencia
    poliza.aseguradoraId = this.aseguradoraId
    poliza.tipoPolizaId = this.tipoPolizaId
    poliza.estado = this.estado
    poliza.vigiladoId = this.vigiladoId

    return poliza
  }


  @belongsTo(() => TblAseguradoras, {
    localKey: 'id',
    foreignKey: 'aseguradoraId',
  })
  public aseguradoras: BelongsTo<typeof TblAseguradoras>

  @hasOne(() => TblResponsabilidades, {
    localKey: 'id',
    foreignKey: 'polizaId',
  })
  public responsabilidad: HasOne<typeof TblResponsabilidades>


}
