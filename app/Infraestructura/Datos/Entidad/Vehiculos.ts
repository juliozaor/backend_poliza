import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm';
import TblPolizas from './poliza';
import { Vehiculo } from 'App/Dominio/Datos/Entidades/Vehiculo';

export default class TblVehiculos extends BaseModel {
  @column({ isPrimary: true, columnName: 'veh_id' })  public id?: number  
  @column({ columnName: 'veh_placa' }) public placa: string
  @column({ columnName: 'veh_pasajeros' }) public pasajeros: number
  @column({ columnName: 'veh_poliza' }) public poliza: number  
  @column({ columnName: 'veh_vigilado_id' }) public vigiladoId: string  
 
  @column.dateTime({ autoCreate: true , columnName: 'veh_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'veh_actualizado' }) public updatedAt: DateTime 


  public establecerVehiculoDb (vehiculo: Vehiculo) {
    this.id = vehiculo.id
    this.placa = vehiculo.placa
    this.pasajeros = vehiculo.pasajeros
    this.poliza = vehiculo.poliza
    this.vigiladoId = vehiculo.vigiladoId
  }

  public estableceVehiculoConId (vehiculo: Vehiculo) {
    this.placa = vehiculo.placa
    this.pasajeros = vehiculo.pasajeros
    this.poliza = vehiculo.poliza
    this.vigiladoId = vehiculo.vigiladoId
  }

  public obtenerVehiculo (): Vehiculo {
    const vehiculo = new Vehiculo()
    vehiculo.id = this.id
    vehiculo.placa = this.placa
    vehiculo.pasajeros = this.pasajeros
    vehiculo.poliza = this.poliza
    vehiculo.vigiladoId = this.vigiladoId
    return vehiculo
  }


  @belongsTo(() => TblPolizas, {
    localKey: 'numero',
    foreignKey: 'poliza',
  })
  public polizas: BelongsTo<typeof TblPolizas>


}
