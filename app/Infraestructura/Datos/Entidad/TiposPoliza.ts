import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import TblCoberturas from "./Coberturas";
export default class TblTiposPolizas extends BaseModel {
  @column({ isPrimary: true, columnName: "tpo_id" }) public id: number;
  @column({ columnName: "tpo_nombre" }) public nombre: string;
  @column({ columnName: "tpo_descripcion" }) public descripcion: string;
  @column({ columnName: "tpo_orden" }) public orden: number;
  @column({ columnName: "tpo_estado" }) public estado: boolean;

  @hasMany(() => TblCoberturas, {
    localKey: "id",
    foreignKey: "tipoPoliza",
  })
  public coberturas: HasMany<typeof TblCoberturas>;
}
