import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_aseguradoras'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ase_id')
      table.bigInteger('ase_nit')
      table.string('ase_nombre', 200)
      table.string('ase_direccion',255)
      table.bigInteger('ase_telefono')
      table.boolean('ase_estado').defaultTo(true)
      table.timestamp('ase_creado', { useTz: true })
      table.timestamp('ase_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
