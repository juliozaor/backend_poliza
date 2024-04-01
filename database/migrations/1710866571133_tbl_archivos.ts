import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_archivos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('arc_id')
      table.integer('arc_poliza_id').references('pol_id').inTable('tbl_polizas')
      table.string('arc_nombre',200)
      table.string('arc_nombre_original',200)
      table.string('arc_ruta',200)
      table.timestamp('arc_creado', { useTz: true })
      table.timestamp('arc_actualizado', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
