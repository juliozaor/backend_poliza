import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_coberturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cob_id')
      table.string('cob_nombre',200)
      table.text('cob_descripcion')
      table.integer('cob_orden', 3)
      table.boolean('cob_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
