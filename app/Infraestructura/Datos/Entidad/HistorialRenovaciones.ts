import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { HistorialRenovacion } from 'App/Dominio/Datos/Entidades/HistorialRenovacion';

export default class TblHistorialRenovaciones extends BaseModel {
  public static table = 'tbl_historial_de_renovaciones';
  @column({ isPrimary: true, columnName: 'hdr_id' }) public id?: number
  @column({ columnName: 'hdr_vigilado_id' }) public vigiladoId: string
  @column({ columnName: 'hdr_numero_poliza' }) public numeroPoliza: number
  @column({ columnName: 'hdr_fecha_inicio_old' }) public inicioVigenciaOld: string
  @column({ columnName: 'hdr_fecha_inicio_new' }) public inicioVigenciaNew: string
  @column({ columnName: 'hdr_fecha_fin_old' }) public finVigenciaOld: string
  @column({ columnName: 'hdr_fecha_fin_new' }) public finVigenciaNew: string
  @column({ columnName: 'hdr_caratula_old' }) public caratulaOld?: string
  @column({ columnName: 'hdr_caratula_new' }) public caratulaNew: string
  @column.dateTime({ autoCreate: true, columnName: 'created_at' }) public creado: DateTime

  public establecerHistorialRenovacionDb(historialRenovacion: HistorialRenovacion) {
    this.id = historialRenovacion.id
    this.vigiladoId = historialRenovacion.vigiladoId
    this.numeroPoliza = historialRenovacion.numeroPoliza
    this.inicioVigenciaOld = historialRenovacion.inicioVigenciaOld
    this.inicioVigenciaNew = historialRenovacion.inicioVigenciaNew
    this.finVigenciaOld = historialRenovacion.finVigenciaOld
    this.finVigenciaNew = historialRenovacion.finVigenciaNew
    this.caratulaOld = historialRenovacion.caratulaOld
    this.caratulaNew = historialRenovacion.caratulaNew
  }

}
