import { DateTime } from 'luxon';
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm';
import { Aseguradora } from 'App/Dominio/Datos/Entidades/Aseguradora';

export default class TblAseguradoras extends BaseModel {
  @column({ isPrimary: true, columnName: 'ase_id' })  public id: number  
  @column({ columnName: 'ase_nit' }) public nit: number
  @column({ columnName: 'ase_nombre' }) public nombre: string
  @column({ columnName: 'ase_direccion' }) public direccion: string
  @column({ columnName: 'ase_telefono' }) public telefono: number
  @column({ columnName: 'ase_estado' }) public estado: boolean
  @column.dateTime({ autoCreate: true , columnName: 'ase_creado'}) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'ase_actualizado' }) public updatedAt: DateTime 

  public establecerAseguradoraDb (aseguradora: Aseguradora) {
    this.id = aseguradora.id
    this.nit = aseguradora.nit
    this.nombre = aseguradora.nombre
    this.direccion = aseguradora.direccion
    this.telefono = aseguradora.telefono
    this.estado = aseguradora.estado
  }

  public estableceAseguradoraConId (aseguradora: Aseguradora) {
    this.nit = aseguradora.nit
    this.nombre = aseguradora.nombre
    this.direccion = aseguradora.direccion
    this.telefono = aseguradora.telefono
    this.estado = aseguradora.estado
  }

  public obtenerAseguradora ():Aseguradora {
    const aseguradora = new Aseguradora()
    aseguradora.id = this.id
    aseguradora.nit = this.nit
    aseguradora.nombre = this.nombre
    aseguradora.direccion = this.direccion
    aseguradora.telefono = this.telefono
    aseguradora.estado = this.estado
    return aseguradora
  }
}
