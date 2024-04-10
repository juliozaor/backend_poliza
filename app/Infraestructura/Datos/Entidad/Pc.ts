import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { Pc } from "App/Dominio/Datos/Entidades/Pc";

export default class TblPcs extends BaseModel {
  public static table = "tbl_pasajeros_carreteras";
  @column({ isPrimary: true, columnName: "pac_id" }) public id?: number;

  @column({ columnName: "pac_minimo_a" }) public minimoA: number;
  @column({ columnName: "pac_maximo_a" }) public maximoA: number;
  @column({ columnName: "pac_minimo_b" }) public minimoB: number;
  @column({ columnName: "pac_maximo_b" }) public maximoB: number;
  @column({ columnName: "pac_minimo_c" }) public minimoC: number;
  @column({ columnName: "pac_maximo_c" }) public maximoC: number;
  @column({ columnName: "pac_grupo_a" }) public grupoA: number;
  @column({ columnName: "pac_grupo_b" }) public grupoB: number;
  @column({ columnName: "pac_grupo_v" }) public grupoC: number;

  @column({ columnName: "pac_estado" }) public estado: boolean;
  @column({ columnName: "pac_vigilado_id" }) public vigiladoId: string;
  @column.dateTime({ autoCreate: true, columnName: "pac_creado" })  public createdAt: DateTime;
  @column.dateTime({ autoCreate: true, autoUpdate: true,  columnName: "pac_actualizado", })  public updatedAt: DateTime;

  public establecerPcDb (pc: Pc) {
    this.id = pc.id
    this.minimoA = pc.minimoA
    this.maximoA = pc.maximoA
    this.minimoB = pc.minimoB
    this.maximoB = pc.maximoB
    this.minimoC = pc.minimoC
    this.maximoC = pc.maximoC
    this.grupoA = pc.grupoA
    this.grupoB = pc.grupoB
    this.grupoC = pc.grupoC
    this.estado = pc.estado
    this.vigiladoId = pc.vigiladoId
  }

  public establecePcConId (pc: Pc) {
    this.minimoA = pc.minimoA
    this.maximoA = pc.maximoA
    this.minimoB = pc.minimoB
    this.maximoB = pc.maximoB
    this.minimoC = pc.minimoC
    this.maximoC = pc.maximoC
    this.grupoA = pc.grupoA
    this.grupoB = pc.grupoB
    this.grupoC = pc.grupoC
    this.estado = pc.estado
  }

  public obtenerPc (): Pc {
    const pc = new Pc()
    pc.id = this.id
    pc.minimoA = this.minimoA 
    pc.maximoA = this.maximoA 
    pc.minimoB = this.minimoB 
    pc.maximoB = this.maximoB 
    pc.minimoC = this.minimoC 
    pc.maximoC = this.maximoC 
    pc.grupoA = this.grupoA 
    pc.grupoB = this.grupoB 
    pc.grupoC = this.grupoC 
    pc.estado = this.estado 

    return pc
  }
}
