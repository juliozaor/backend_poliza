import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_tipos_polizas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tpo_id')
      table.string('tpo_nombre',200)
      table.text('tpo_descripcion')
      table.integer('tpo_orden', 3)
      table.boolean('tpo_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
