import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { Es } from "App/Dominio/Datos/Entidades/Es";

export default class TblEss extends BaseModel {
  public static table = "tbl_transportes_especiales";
  @column({ isPrimary: true, columnName: "tre_id" }) public id?: number;

  @column({ columnName: 'tre_automovil_a' }) public automovilA: number;
  @column({ columnName: 'tre_campero_a' }) public camperoA: number;
  @column({ columnName: 'tre_van_a' }) public vanA: number;
  @column({ columnName: 'tre_doble_a' }) public dobleA: number;
  @column({ columnName: 'tre_microbus_a' }) public microbusA: number;
  @column({ columnName: 'tre_buseta_a' }) public busetaA: number;
  @column({ columnName: 'tre_bus_a' }) public busA: number;
  @column({ columnName: 'tre_automovil_v' }) public automovilV: number;
  @column({ columnName: 'tre_campero_v' }) public camperoV: number;
  @column({ columnName: 'tre_van_v' }) public vanV: number;
  @column({ columnName: 'tre_doble_v' }) public dobleV: number;
  @column({ columnName: 'tre_microbus_v' }) public microbusV: number;
  @column({ columnName: 'tre_buseta_v' }) public busetaV: number;
  @column({ columnName: 'tre_bus_v' }) public busV: number;

  @column({ columnName: "tre_estado" }) public estado: boolean;
  @column({ columnName: "tre_vigilado_id" }) public vigiladoId: string;
  @column.dateTime({ autoCreate: true, columnName: "tre_creado" })  public createdAt: DateTime;
  @column.dateTime({ autoCreate: true, autoUpdate: true,  columnName: "tre_actualizado", })  public updatedAt: DateTime;

  public establecerEsDb (es: Es) {
    this.id = es.id
    this.automovilA = es.automovilA
    this.camperoA = es.camperoA
    this.vanA = es.vanA
    this.dobleA = es.dobleA
    this.microbusA = es.microbusA
    this.busetaA = es.busetaA
    this.busA = es.busA
    this.automovilV = es.automovilV
    this.camperoV = es.camperoV
    this.vanV = es.vanV
    this.dobleV = es.dobleV
    this.microbusV = es.microbusV
    this.busetaV = es.busetaV
    this.busV = es.busV
    this.estado = es.estado
    this.vigiladoId = es.vigiladoId
  }

  public estableceEsConId (es: Es) {
    this.automovilA = es.automovilA
    this.camperoA = es.camperoA
    this.vanA = es.vanA
    this.dobleA = es.dobleA
    this.microbusA = es.microbusA
    this.busetaA = es.busetaA
    this.busA = es.busA
    this.automovilV = es.automovilV
    this.camperoV = es.camperoV
    this.vanV = es.vanV
    this.dobleV = es.dobleV
    this.microbusV = es.microbusV
    this.busetaV = es.busetaV
    this.busV = es.busV
    this.estado = es.estado
  }

  public obtenerEs ():Es {
    const es = new Es()
    es.id = this.id
    es.camperoA = this.camperoA
    es.vanA = this.vanA
    es.dobleA = this.dobleA
    es.microbusA = this.microbusA
    es.busetaA = this.busetaA
    es.busA = this.busA
    es.automovilV = this.automovilV
    es.camperoV = this.camperoV
    es.vanV = this.vanV
    es.dobleV = this.dobleV
    es.microbusV = this.microbusV
    es.busetaV = this.busetaV
    es.busV = this.busV
    es.estado = this.estado
    return es
  }
}
