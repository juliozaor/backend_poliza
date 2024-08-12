import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblLogVehiculos extends BaseModel {
  public static table = 'tbl_log_vehiculos';
  
  @column({ isPrimary: true, columnName: 'lov_id' })
  public id?: number

  @column({ columnName: 'lov_tipo_poliza' }) public tipoPoliza: number;
  @column({ columnName: 'lov_poliza' }) public poliza: number;
  @column({ columnName: 'lov_placa' }) public placa: string;
  @column({ columnName: 'lov_vinculada' }) public vinculada: boolean;
  @column({ columnName: 'lov_observacion' }) public observacion: string;

  @column.dateTime({ autoCreate: true, columnName: 'lov_creado' })
  public creacion: DateTime

 
}


