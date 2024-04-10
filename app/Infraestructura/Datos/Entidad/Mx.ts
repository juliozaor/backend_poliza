import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { Mx } from "App/Dominio/Datos/Entidades/Mx";

export default class TblEss extends BaseModel {
  public static table = "tbl_transportes_mixtos";
  @column({ isPrimary: true, columnName: "trm_id" }) public id?: number;

  @column({ columnName: 'trm_campero_a' }) public camperoA: number;
  @column({ columnName: 'trm_doble_a' }) public dobleA: number;
  @column({ columnName: 'trm_microbus_a' }) public microbusA: number;
  @column({ columnName: 'trm_buseta_a' }) public busetaA: number;
  @column({ columnName: 'trm_bus_a' }) public busA: number;
  @column({ columnName: 'trm_bus_escalera_a' }) public busEscaleraA: number;
  @column({ columnName: 'trm_chiva_a' }) public chivaA: number;
  @column({ columnName: 'trm_campero_v' }) public camperoV: number;
  @column({ columnName: 'trm_doble_v' }) public dobleV: number;
  @column({ columnName: 'trm_microbus_v' }) public microbusV: number;
  @column({ columnName: 'trm_buseta_v' }) public busetaV: number;
  @column({ columnName: 'trm_bus_v' }) public busV: number;
  @column({ columnName: 'trm_bus_escalera_v' }) public busEscaleraV: number;
  @column({ columnName: 'trm_chiva_v' }) public chivaV: number;


  @column({ columnName: "trm_estado" }) public estado: boolean;
  @column({ columnName: "trm_vigilado_id" }) public vigiladoId: string;
  @column.dateTime({ autoCreate: true, columnName: "trm_creado" })  public createdAt: DateTime;
  @column.dateTime({ autoCreate: true, autoUpdate: true,  columnName: "trm_actualizado", })  public updatedAt: DateTime;

  public establecerMxDb (mx: Mx) {
    this.id = mx.id
    this.busEscaleraA = mx.busEscaleraA
    this.camperoA = mx.camperoA
    this.chivaA = mx.chivaA
    this.dobleA = mx.dobleA
    this.microbusA = mx.microbusA
    this.busetaA = mx.busetaA
    this.busA = mx.busA
    this.busEscaleraV = mx.busEscaleraV
    this.camperoV = mx.camperoV
    this.chivaV = mx.chivaV
    this.dobleV = mx.dobleV
    this.microbusV = mx.microbusV
    this.busetaV = mx.busetaV
    this.busV = mx.busV
    this.estado = mx.estado
    this.vigiladoId = mx.vigiladoId
  }

  public estableceMxConId (mx: Mx) {
    this.busEscaleraA = mx.busEscaleraA
    this.camperoA = mx.camperoA
    this.chivaA = mx.chivaA
    this.dobleA = mx.dobleA
    this.microbusA = mx.microbusA
    this.busetaA = mx.busetaA
    this.busA = mx.busA
    this.busEscaleraV = mx.busEscaleraV
    this.camperoV = mx.camperoV
    this.chivaV = mx.chivaV
    this.dobleV = mx.dobleV
    this.microbusV = mx.microbusV
    this.busetaV = mx.busetaV
    this.busV = mx.busV
    this.estado = mx.estado
  }

  public obtenerMx ():Mx {
    const mx = new Mx()
    mx.id = this.id
    mx.camperoA = this.camperoA
    mx.chivaA = this.chivaA
    mx.dobleA = this.dobleA
    mx.microbusA = this.microbusA
    mx.busetaA = this.busetaA
    mx.busA = this.busA
    mx.busEscaleraV = this.busEscaleraV
    mx.camperoV = this.camperoV
    mx.chivaV = this.chivaV
    mx.dobleV = this.dobleV
    mx.microbusV = this.microbusV
    mx.busetaV = this.busetaV
    mx.busV = this.busV
    mx.estado = this.estado
    return mx
  }
}
