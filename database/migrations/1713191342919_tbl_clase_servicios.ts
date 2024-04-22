import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_clase_servicios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cse_id')
      table.string('cse_nombre', 150)
      table.boolean('cse_estado').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
